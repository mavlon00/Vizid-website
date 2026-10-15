export type CheckoutAuthDecision = {
  requiresAuth: boolean;
  action: 'checkout' | 'auth' | 'guest_checkout';
  message: string;
};

export function getCheckoutAuthDecision({
  hasSession,
  guestCheckoutAllowed = true,
}: {
  hasSession: boolean;
  guestCheckoutAllowed?: boolean;
}): CheckoutAuthDecision {
  if (hasSession) {
    return {
      requiresAuth: false,
      action: 'checkout',
      message: 'You are signed in and can continue to secure checkout.',
    };
  }

  if (guestCheckoutAllowed) {
    return {
      requiresAuth: false,
      action: 'guest_checkout',
      message: 'Continue as a guest to complete your purchase, or sign in to save your checkout details.',
    };
  }

  return {
    requiresAuth: true,
    action: 'auth',
    message: 'Sign in or create an account to complete your order securely.',
  };
}
