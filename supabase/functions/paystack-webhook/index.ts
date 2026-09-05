import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts';

serve(async (req) => {
  // Paystack sends POST only; reject anything else
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
  if (!paystackSecretKey) {
    console.error('PAYSTACK_SECRET_KEY not configured');
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── 1. Read raw body for signature verification ────────────────
  const rawBody = await req.text();

  // ── 2. Verify HMAC-SHA512 signature ───────────────────────────
  const paystackSig = req.headers.get('x-paystack-signature');
  if (!paystackSig) {
    console.warn('Webhook missing x-paystack-signature header');
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const expectedSig = createHmac('sha512', paystackSecretKey)
    .update(rawBody)
    .digest('hex');

  if (paystackSig !== expectedSig) {
    console.warn(`Webhook signature mismatch. Got: ${paystackSig}, Expected: ${expectedSig}`);
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── 3. Parse event ─────────────────────────────────────────────
  let event: { event: string; data: any };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only handle charge.success; acknowledge all other events
  if (event.event !== 'charge.success') {
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const txn = event.data;
  const reference = txn.reference as string;

  // ── 4. Fetch order via service role ────────────────────────────
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .select('id, total_amount, status')
    .eq('paystack_reference', reference)
    .maybeSingle();

  if (orderError || !order) {
    // Don't leak info; Paystack must receive 200 or it will retry
    console.error(`Webhook: order not found for reference ${reference}`);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Idempotent — already paid, nothing to do
  if (order.status === 'paid') {
    return new Response(JSON.stringify({ received: true, already_paid: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── 5. Amount check (kobo → Naira) ─────────────────────────────
  const paidNaira = (txn.amount as number) / 100;
  const expectedNaira = Number(order.total_amount);

  if (Math.abs(paidNaira - expectedNaira) > 0.01) {
    console.error(
      `Webhook amount mismatch for ref ${reference}: expected ₦${expectedNaira}, got ₦${paidNaira}`,
    );
    // Mark failed so we can investigate
    await supabaseAdmin
      .from('orders')
      .update({ status: 'failed' })
      .eq('paystack_reference', reference);

    // Still return 200 so Paystack stops retrying; we log it for review
    return new Response(JSON.stringify({ received: true, error: 'amount_mismatch' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── 6. Mark paid idempotently via service role ─────────────────
  const { error: updateError } = await supabaseAdmin
    .from('orders')
    .update({ status: 'paid' })
    .eq('paystack_reference', reference)
    .eq('status', 'pending'); // only update if still pending

  if (updateError) {
    console.error(`Webhook: failed to update order ${order.id}:`, updateError);
    // Return 500 so Paystack retries
    return new Response(JSON.stringify({ error: 'DB update failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(`Webhook: order ${order.id} marked paid via webhook (ref: ${reference})`);
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
