import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ProductInfo {
  name: string;
  url: string;
  price: string;
}

export class SearchResultsPage extends BasePage {
  private readonly pageTitle = this.page.locator('.page-title h1');
  private readonly products = this.page.locator('.product-item');

  async assertResultsVisible(): Promise<void> {
    await expect(this.pageTitle).toContainText('Search');
    await expect(this.products.first()).toBeVisible({ timeout: 10000 });
  }

  async getFirstProductInfo(): Promise<ProductInfo> {
    const first = this.products.first();
    const name = (await first.locator('.product-title a').textContent() ?? '').trim();
    const url = (await first.locator('.product-title a').getAttribute('href')) ?? '';
    const price = (await first.locator('.actual-price').textContent() ?? '').trim();
    expect(name).not.toBe('');
    expect(url).not.toBe('');
    return { name, url, price };
  }
}
