import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async getCartCount(): Promise<string> {
    return (await this.page.locator('.header-links .cart-qty').textContent()) ?? '(0)';
  }

  async getLoggedInEmail(): Promise<string> {
    return (await this.page.locator('.header-links .account').textContent()) ?? '';
  }

  async saveSession(authStatePath: string): Promise<void> {
    await this.page.context().storageState({ path: authStatePath });
  }
}
