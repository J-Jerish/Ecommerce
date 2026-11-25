import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly pageTitle = this.page.locator('.page-title h1');
  private readonly cartBody = this.page.locator('.cart tbody');
  private readonly qtyInput = this.page.locator('.qty-input').first();
  private readonly updateBtn = this.page.locator("input[value='Update shopping cart']");
  private readonly couponInput = this.page.locator('#coupon-code');
  private readonly applyCouponBtn = this.page.locator('#applycouponbutton');
  private readonly couponResult = this.page.locator(
    '.coupon-code-result, .bar-notification, .message-failure, .message-success'
  ).first();
  private readonly termsCheckbox = this.page.locator('#termsofservice');
  private readonly checkoutBtn = this.page.locator('#checkout');

  async goto(): Promise<void> {
    await this.page.goto('/cart');
    await expect(this.pageTitle).toContainText('Shopping cart');
  }

  async assertProductInCart(productName: string): Promise<void> {
    await expect(this.cartBody).toContainText(productName, { timeout: 10000 });
  }

  async updateQuantity(qty: number): Promise<void> {
    await this.qtyInput.fill(String(qty));
    await this.updateBtn.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.qtyInput).toHaveValue(String(qty), { timeout: 10000 });
  }

  async applyCoupon(code: string): Promise<string> {
    if (!await this.couponInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      return 'Coupon section not available';
    }
    await this.couponInput.fill(code);
    await this.applyCouponBtn.click();
    await expect(this.couponResult).toBeVisible({ timeout: 10000 });
    return (await this.couponResult.textContent() ?? '').trim();
  }

  async proceedToCheckout(): Promise<void> {
    await this.termsCheckbox.check();
    await this.checkoutBtn.click();
  }
}
