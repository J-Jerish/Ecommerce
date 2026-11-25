import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  private readonly completedSection = this.page.locator('.section.order-completed');
  private readonly successTitle = this.page.locator('.order-completed .title strong');
  private readonly orderNumberEl = this.page.locator('.order-number');

  async assertSuccess(): Promise<void> {
    await expect(this.completedSection).toBeVisible({ timeout: 15000 });
    await expect(this.successTitle).toContainText('Your order has been successfully processed!');
  }

  async getOrderNumber(): Promise<string> {
    if (await this.orderNumberEl.isVisible({ timeout: 3000 }).catch(() => false)) {
      return ((await this.orderNumberEl.textContent()) ?? '').replace(/\D/g, '');
    }
    return '';
  }
}
