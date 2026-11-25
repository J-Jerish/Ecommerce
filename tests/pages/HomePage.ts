import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly searchInput = this.page.locator('#small-searchterms');
  private readonly searchButton = this.page.locator('input.search-box-button');
  private readonly logoutLink = this.page.locator('.header-links a[href="/logout"]');
  private readonly loginLink = this.page.locator('.header-links a[href="/login"]');
  private readonly accountLink = this.page.locator('.header-links .account');

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async assertLoggedIn(email: string): Promise<void> {
    const { expect } = await import('@playwright/test');
    await expect(this.accountLink).toContainText(email);
  }

  async assertLoggedOut(): Promise<void> {
    const { expect } = await import('@playwright/test');
    await expect(this.accountLink).not.toBeVisible({ timeout: 10000 });
    await expect(this.loginLink).toBeVisible();
  }
}
