import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  private readonly pageTitle = this.page.locator('.page-title h1');
  private readonly orderList = this.page.locator('.order-list, .order-item-box');
  private readonly firstOrderRow = this.page.locator('.order-list li, .order-item-box').first();

  async gotoOrders(): Promise<void> {
    await this.page.goto('/customer/orders');
    await expect(this.pageTitle).toContainText('My account', { timeout: 10000 });
    await expect(this.firstOrderRow).toBeVisible({ timeout: 10000 });
  }

  async assertOrderVisible(orderNumber: string): Promise<void> {
    if (orderNumber) {
      await expect(this.orderList).toContainText(orderNumber, { timeout: 10000 });
    } else {
      await expect(this.firstOrderRow).toBeVisible();
    }
  }
}
