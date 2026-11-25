import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface BillingAddress {
  country: string;
  city: string;
  address1: string;
  zip: string;
  phone: string;
}

export class CheckoutPage extends BasePage {
  private readonly billingContainer = this.page.locator('#billing-buttons-container');
  private readonly billingDropdown = this.page.locator('#billing-address-select');
  private readonly billingCountry = this.page.locator('#BillingNewAddress_CountryId');
  private readonly billingCity = this.page.locator('#BillingNewAddress_City');
  private readonly billingAddress1 = this.page.locator('#BillingNewAddress_Address1');
  private readonly billingZip = this.page.locator('#BillingNewAddress_ZipPostalCode');
  private readonly billingPhone = this.page.locator('#BillingNewAddress_PhoneNumber');
  private readonly billingContinue = this.page.locator('#billing-buttons-container input[value="Continue"]');
  private readonly shippingContinue = this.page.locator('#shipping-buttons-container input[value="Continue"]');
  private readonly shippingMethodContinue = this.page.locator('#shipping-method-buttons-container input[value="Continue"]');
  private readonly paymentMethodContinue = this.page.locator('#payment-method-buttons-container input[value="Continue"]');
  private readonly paymentInfoContinue = this.page.locator('#payment-info-buttons-container input[value="Continue"]');
  private readonly confirmBtn = this.page.locator('#confirm-order-buttons-container input[value="Confirm"]');

  async goto(): Promise<void> {
    await this.page.goto('/checkout');
    await this.page.waitForLoadState('networkidle');
  }

  async fillBillingAddress(address: BillingAddress): Promise<void> {
    await expect(this.billingContainer).toBeVisible({ timeout: 15000 });

    if (await this.billingDropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.billingDropdown.selectOption({ label: 'New Address' });
      await expect(this.billingCountry).toBeVisible();
    }

    await this.billingCountry.selectOption({ label: address.country });
    await expect(this.billingCity).toBeVisible();
    await this.billingCity.fill(address.city);
    await this.billingAddress1.fill(address.address1);
    await this.billingZip.fill(address.zip);
    await this.billingPhone.fill(address.phone);
    await this.billingContinue.click();
  }

  async continueBillingWithSavedAddress(): Promise<void> {
    if (await this.billingDropdown.isVisible().catch(() => false)) {
      // Index 0 is the first saved address; "New Address" is last in NopCommerce
      await this.billingDropdown.selectOption({ index: 0 });
      await this.page.waitForLoadState('networkidle');
    }
    await this.billingContinue.click();
  }

  async continueShipping(): Promise<void> {
    await expect(this.shippingContinue).toBeVisible({ timeout: 10000 });
    await this.shippingContinue.click();
  }

  async continueShippingMethod(): Promise<void> {
    await expect(this.shippingMethodContinue).toBeVisible({ timeout: 10000 });
    await this.shippingMethodContinue.click();
  }

  async continuePaymentMethod(): Promise<void> {
    await expect(this.paymentMethodContinue).toBeVisible({ timeout: 10000 });
    await this.paymentMethodContinue.click();
  }

  async continuePaymentInfo(): Promise<void> {
    await expect(this.paymentInfoContinue).toBeVisible({ timeout: 10000 });
    await this.paymentInfoContinue.click();
  }

  async assertConfirmVisible(): Promise<void> {
    await expect(this.confirmBtn).toBeVisible({ timeout: 10000 });
  }

  async confirmOrder(): Promise<void> {
    await expect(this.confirmBtn).toBeVisible({ timeout: 15000 });
    await this.confirmBtn.click();
  }

  async ensureAtShippingMethodStep(): Promise<void> {
    // Fast-path: already at shipping method
    if (await this.shippingMethodContinue.isVisible().catch(() => false)) return;

    // NopCommerce always starts from billing on a fresh /checkout navigation.
    // Complete billing (using saved address if available), then explicitly wait
    // for the AJAX response that reveals the shipping step.
    if (await this.billingContinue.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.continueBillingWithSavedAddress();
      await expect(this.shippingContinue).toBeVisible({ timeout: 15000 });
      await this.shippingContinue.click();
    }

    await expect(this.shippingMethodContinue).toBeVisible({ timeout: 15000 });
  }

  async ensureAtConfirmStep(): Promise<void> {
    // Fast-path: already at confirm step
    if (await this.confirmBtn.isVisible().catch(() => false)) return;

    await this.ensureAtShippingMethodStep();
    await this.continueShippingMethod();
    await this.continuePaymentMethod();
    await this.continuePaymentInfo();

    await expect(this.confirmBtn).toBeVisible({ timeout: 15000 });
  }
}
