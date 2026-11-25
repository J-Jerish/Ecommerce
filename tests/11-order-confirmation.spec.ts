import { test } from '@playwright/test';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { writeState, AUTH_STATE } from './helpers/state';

test.use({ storageState: AUTH_STATE });

test('Flow 11: Order Confirmation', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const confirmationPage = new OrderConfirmationPage(page);

  await checkoutPage.goto();
  await checkoutPage.ensureAtConfirmStep();
  await checkoutPage.confirmOrder();

  await confirmationPage.assertSuccess();

  const orderNumber = await confirmationPage.getOrderNumber();
  writeState('order-state.json', { orderNumber });
  console.log(`Order placed: #${orderNumber}`);

  await page.context().storageState({ path: AUTH_STATE });
});
