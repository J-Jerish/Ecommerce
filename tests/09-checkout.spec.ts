import { test } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { config } from './config/test-config';
import { AUTH_STATE } from './helpers/state';

test.use({ storageState: AUTH_STATE });

test('Flow 9: Checkout – Billing & Shipping Address', async ({ page }) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await cartPage.goto();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillBillingAddress(config.address);
  await checkoutPage.continueShipping();

  // Save session at the shipping-method step so Flow 10 can resume here
  await page.context().storageState({ path: AUTH_STATE });
});
