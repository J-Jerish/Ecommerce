import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput = this.page.locator('#Email');
  private readonly passwordInput = this.page.locator('#Password');
  private readonly loginButton = this.page.locator("input[value='Log in']");
  private readonly accountLink = this.page.locator('.header-links .account');

  async goto(): Promise<void> {
    await this.page.goto('/login');
    await expect(this.emailInput).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoggedIn(email: string): Promise<void> {
    await expect(this.accountLink).toContainText(email);
  }
}
