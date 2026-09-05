import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ── 1. Parse body ──────────────────────────────────────────────
    const { reference } = await req.json() as { reference: string };
    if (!reference) {
      return new Response(
        JSON.stringify({ error: 'Missing payment reference' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // ── 2. Authenticate caller ─────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // ── 3. Fetch the pending order via service role ────────────────
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id, user_id, total_amount, status')
      .eq('paystack_reference', reference)
      .maybeSingle();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: 'Order not found for this reference' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (order.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Order does not belong to this user' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Idempotent — already paid is fine
    if (order.status === 'paid') {
      return new Response(
        JSON.stringify({ success: true, order_id: order.id, already_paid: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (order.status !== 'pending') {
      return new Response(
        JSON.stringify({ error: `Order is in terminal state: ${order.status}` }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // ── 4. Verify with Paystack server-side ────────────────────────
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Payment verification service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      console.error('Paystack API error:', JSON.stringify(paystackData));
      return new Response(
        JSON.stringify({ error: 'Paystack verification failed', detail: paystackData.message }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const txn = paystackData.data;

    if (txn.status !== 'success') {
      await supabaseAdmin
        .from('orders')
        .update({ status: 'failed' })
        .eq('paystack_reference', reference);

      return new Response(
        JSON.stringify({ error: `Payment not successful. Paystack status: ${txn.status}` }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // ── 5. Amount check: Paystack returns kobo, orders store Naira ─
    const paidNaira = txn.amount / 100;
    const expectedNaira = Number(order.total_amount);

    if (Math.abs(paidNaira - expectedNaira) > 0.01) {
      console.error(`Amount mismatch: expected ₦${expectedNaira}, got ₦${paidNaira} (ref: ${reference})`);
      await supabaseAdmin
        .from('orders')
        .update({ status: 'failed' })
        .eq('paystack_reference', reference);

      return new Response(
        JSON.stringify({ error: `Amount mismatch: expected ${expectedNaira}, got ${paidNaira}` }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // ── 6. Mark paid via service role (bypasses RLS) ───────────────
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid' })
      .eq('paystack_reference', reference);

    if (updateError) {
      console.error('Failed to update order status:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to record payment. Contact support with ref: ' + reference }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, order_id: order.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    console.error('Unhandled error in verify-payment:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
