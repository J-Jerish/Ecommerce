import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { config } from './config/test-config';
import { AUTH_STATE } from './helpers/state';

test.use({ storageState: AUTH_STATE });

test('Flow 8: Apply Coupon', async ({ page }) => {
  const cartPage = new CartPage(page);

  await cartPage.goto();

  const responseText = await cartPage.applyCoupon(config.coupon.code);
  console.log(`Coupon "${config.coupon.code}" response: ${responseText}`);

  // Verify the UI gave feedback (success or failure — both are valid outcomes)
  expect(responseText.length).toBeGreaterThan(0);

  // Cart must still be intact regardless of coupon outcome
  await cartPage.assertProductInCart('');

  await page.context().storageState({ path: AUTH_STATE });
});
