import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class RegisterPage extends BasePage {
  private readonly genderMale = this.page.locator('#gender-male');
  private readonly firstNameInput = this.page.locator('#FirstName');
  private readonly lastNameInput = this.page.locator('#LastName');
  private readonly emailInput = this.page.locator('#Email');
  private readonly passwordInput = this.page.locator('#Password');
  private readonly confirmPasswordInput = this.page.locator('#ConfirmPassword');
  private readonly registerButton = this.page.locator('#register-button');
  private readonly successMessage = this.page.locator('.result');

  async goto(): Promise<void> {
    await this.page.goto('/register');
    await expect(this.page.locator('.page-title h1')).toHaveText('Register');
  }

  async fillForm(user: UserData): Promise<void> {
    await this.genderMale.check();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  async assertSuccess(): Promise<void> {
    await expect(this.successMessage).toContainText('Your registration completed');
  }
}
