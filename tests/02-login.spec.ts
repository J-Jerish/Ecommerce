import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { readState, AUTH_STATE } from './helpers/state';

interface TestUser {
  email: string;
  password: string;
}

let testUser: TestUser;

test.beforeAll(() => {
  testUser = readState<TestUser>('test-user.json');
});

test('Flow 2: Login with Created User', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password);
  await loginPage.assertLoggedIn(testUser.email);

  await page.context().storageState({ path: AUTH_STATE });
});
