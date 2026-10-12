import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * Simulates the Shop authentication redirect and intended action preservation logic.
 */
class ShopAuthIntegrationSimulator {
  constructor(initialSession = null) {
    this.session = initialSession;
    this.currentPage = 'shop';
    this.wishlist = new Set();
    this.cart = [];
    this.sessionStorage = new Map();
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  requireAuth(action) {
    this.sessionStorage.set('vizid_pending_shop_action', JSON.stringify(action));
    this.setCurrentPage('auth');
  }

  handleToggleWishlist(productId) {
    if (!this.session) {
      this.requireAuth({ type: 'wishlist', productId });
      return false;
    }
    if (this.wishlist.has(productId)) {
      this.wishlist.delete(productId);
    } else {
      this.wishlist.add(productId);
    }
    return true;
  }

  handleAddToCart(product) {
    if (!this.session) {
      this.requireAuth({ type: 'add_to_cart', product });
      return false;
    }
    const existing = this.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
    return true;
  }

  loginAndReturnToShop(userSession) {
    this.session = userSession;
    this.setCurrentPage('shop');

    // Restore and execute intended action from sessionStorage upon return
    const stored = this.sessionStorage.get('vizid_pending_shop_action');
    if (stored) {
      const action = JSON.parse(stored);
      if (action.type === 'wishlist') {
        this.wishlist.add(action.productId);
      } else if (action.type === 'add_to_cart') {
        const existing = this.cart.find((item) => item.id === action.product.id);
        if (existing) {
          existing.qty += 1;
        } else {
          this.cart.push({ ...action.product, qty: 1 });
        }
      }
      this.sessionStorage.delete('vizid_pending_shop_action');
    }
  }

  logout() {
    this.session = null;
  }
}

test('Guest shopping action redirects to existing auth page and preserves intended action', () => {
  const shop = new ShopAuthIntegrationSimulator(null);

  // 1. Guest clicks Heart on product
  const wishlistResult = shop.handleToggleWishlist('prod-1');
  assert.equal(wishlistResult, false, 'Wishlist action should be blocked for guest');
  assert.equal(shop.currentPage, 'auth', 'Should redirect to existing auth page');
  assert.equal(shop.sessionStorage.has('vizid_pending_shop_action'), true);

  // 2. User completes authentication and returns to shop
  shop.loginAndReturnToShop({ user: { id: 'u1', email: 'guest@example.com' } });
  assert.equal(shop.currentPage, 'shop', 'Should return to shop');
  assert.equal(shop.wishlist.has('prod-1'), true, 'Intended wishlist action should be executed');
  assert.equal(shop.sessionStorage.has('vizid_pending_shop_action'), false, 'SessionStorage should be cleared');
});

test('Guest Add to Cart redirects to existing auth page and completes upon authentication', () => {
  const shop = new ShopAuthIntegrationSimulator(null);
  const sampleProduct = { id: 'chair-1', name: 'Velvet Lounge Chair', price: 150000 };

  // 1. Guest clicks Add to Cart
  const cartResult = shop.handleAddToCart(sampleProduct);
  assert.equal(cartResult, false, 'Add to cart action should be blocked for guest');
  assert.equal(shop.currentPage, 'auth', 'Should redirect to existing auth page');

  // 2. User completes authentication and returns to shop
  shop.loginAndReturnToShop({ user: { id: 'u1', email: 'guest@example.com' } });
  assert.equal(shop.currentPage, 'shop');
  assert.equal(shop.cart.length, 1, 'Cart should contain item');
  assert.equal(shop.cart[0].id, 'chair-1');
  assert.equal(shop.cart[0].qty, 1);
});

test('Authenticated user actions proceed directly without redirect', () => {
  const shop = new ShopAuthIntegrationSimulator({ user: { id: 'u1', email: 'user@example.com' } });
  const sampleProduct = { id: 'lamp-1', name: 'Brass Lamp', price: 45000 };

  const wishlistResult = shop.handleToggleWishlist('lamp-1');
  assert.equal(wishlistResult, true);
  assert.equal(shop.currentPage, 'shop', 'Page should remain shop');
  assert.equal(shop.wishlist.has('lamp-1'), true);

  const cartResult = shop.handleAddToCart(sampleProduct);
  assert.equal(cartResult, true);
  assert.equal(shop.currentPage, 'shop', 'Page should remain shop');
  assert.equal(shop.cart.length, 1);
});

test('Logout restores guest restrictions and redirects to auth on action', () => {
  const shop = new ShopAuthIntegrationSimulator({ user: { id: 'u1', email: 'user@example.com' } });
  shop.logout();

  const result = shop.handleToggleWishlist('lamp-2');
  assert.equal(result, false);
  assert.equal(shop.currentPage, 'auth');
});
