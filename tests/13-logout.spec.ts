import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { readState, AUTH_STATE } from './helpers/state';

interface TestUser {
  email: string;
}

test.use({ storageState: AUTH_STATE });

let testUser: TestUser;

test.beforeAll(() => {
  testUser = readState<TestUser>('test-user.json');
});

test('Flow 13: Logout', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.assertLoggedIn(testUser.email);

  await homePage.logout();
  await homePage.assertLoggedOut();

  // Navigating to a protected page must redirect to login
  await page.goto('/customer/info');
  await expect(page).toHaveURL(/login/, { timeout: 10000 });
});
