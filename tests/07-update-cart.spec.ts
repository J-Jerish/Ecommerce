import { test } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { readState, writeState, AUTH_STATE } from './helpers/state';

interface CartState {
  productName: string;
  productUrl: string;
  quantity: number;
}

test.use({ storageState: AUTH_STATE });

let cart: CartState;

test.beforeAll(() => {
  cart = readState<CartState>('cart-state.json');
});

test('Flow 7: Update Cart', async ({ page }) => {
  const cartPage = new CartPage(page);

  await cartPage.goto();
  await cartPage.assertProductInCart(cart.productName);
  await cartPage.updateQuantity(2);

  writeState('cart-state.json', { ...cart, quantity: 2 });

  await page.context().storageState({ path: AUTH_STATE });
});
