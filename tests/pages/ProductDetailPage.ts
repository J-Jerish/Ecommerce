import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  private readonly productTitle = this.page.locator('.product-name h1');
  private readonly priceEl = this.page.locator('.product-price');
  private readonly actualPrice = this.page.locator('.actual-price').first();
  private readonly overview = this.page.locator('.overview');
  private readonly addToCartBtn = this.page.locator("input[value='Add to cart']").first();
  private readonly cartQty = this.page.locator('.header-links .cart-qty');

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async assertLoaded(expectedName: string): Promise<void> {
    await expect(this.productTitle).toContainText(expectedName, { timeout: 10000 });
    await expect(this.priceEl).toBeVisible();
    await expect(this.overview).toBeVisible();
  }

  async assertPrice(expectedPrice: string): Promise<void> {
    await expect(this.actualPrice).toContainText(expectedPrice);
  }

  async addToCart(): Promise<void> {
    const before = await this.cartQty.textContent() ?? '(0)';
    await this.addToCartBtn.click();
    await expect(this.cartQty).not.toHaveText(before, { timeout: 10000 });
  }
}
