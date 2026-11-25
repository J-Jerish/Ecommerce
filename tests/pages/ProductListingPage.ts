import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductListingPage extends BasePage {
  private readonly products = this.page.locator('.product-item');
  private readonly sortDropdown = this.page.locator('#products-orderby');
  private readonly pageSizeDropdown = this.page.locator('#products-pagesize');
  private readonly listViewBtn = this.page.locator('.product-viewmode a[value="list"], .viewmode-icon.list');

  async goto(categoryPath: string): Promise<void> {
    await this.page.goto(categoryPath);
    await expect(this.products.first()).toBeVisible({ timeout: 10000 });
  }

  async sortBy(optionIndex: number = 1): Promise<void> {
    await this.sortDropdown.selectOption({ index: optionIndex });
    await this.page.waitForLoadState('networkidle');
  }

  async setPageSize(index: number): Promise<void> {
    if (await this.pageSizeDropdown.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.pageSizeDropdown.selectOption({ index });
      await this.page.waitForLoadState('networkidle');
    }
  }

  async switchToListView(): Promise<void> {
    if (await this.listViewBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.listViewBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async assertProductsVisible(): Promise<void> {
    await expect(this.products.first()).toBeVisible({ timeout: 10000 });
  }

  async getProductCount(): Promise<number> {
    return this.products.count();
  }
}
