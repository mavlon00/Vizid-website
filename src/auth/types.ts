export type PendingShoppingAction =
  | { type: 'wishlist'; productId: string | number }
  | { type: 'add_to_cart'; product: any }
  | { type: 'checkout' }
  | { type: 'view_wishlist' };

export interface AuthSuccessCallbackData {
  action?: PendingShoppingAction | null;
  user: any;
}
