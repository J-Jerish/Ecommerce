import { test } from '@playwright/test';
import { CheckoutPage } from './pages/CheckoutPage';
import { AUTH_STATE } from './helpers/state';

test.use({ storageState: AUTH_STATE });

test('Flow 10: Payment', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.goto();

  // Resume from wherever the session left off (handles rare session-reset edge case)
  await checkoutPage.ensureAtShippingMethodStep();

  await checkoutPage.continueShippingMethod();
  await checkoutPage.continuePaymentMethod();
  await checkoutPage.continuePaymentInfo();
  await checkoutPage.assertConfirmVisible();

  await page.context().storageState({ path: AUTH_STATE });
});
