import { test } from '@playwright/test';
import { AccountPage } from './pages/AccountPage';
import { readState, AUTH_STATE } from './helpers/state';

interface OrderState {
  orderNumber: string;
}

test.use({ storageState: AUTH_STATE });

let orderState: OrderState;

test.beforeAll(() => {
  orderState = readState<OrderState>('order-state.json');
});

test('Flow 12: Verify Order History', async ({ page }) => {
  const accountPage = new AccountPage(page);

  await accountPage.gotoOrders();
  await accountPage.assertOrderVisible(orderState.orderNumber);

  await page.context().storageState({ path: AUTH_STATE });
});
