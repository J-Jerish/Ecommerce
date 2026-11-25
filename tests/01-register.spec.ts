import { test } from '@playwright/test';
import { RegisterPage } from './pages/RegisterPage';
import { config } from './config/test-config';
import { writeState, ensureStateDir } from './helpers/state';

const timestamp = Date.now();
const testUser = {
  firstName: config.user.firstName,
  lastName: config.user.lastName,
  email: `testuser${timestamp}@example.com`,
  password: config.user.password,
};

test('Flow 1: Register Account', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goto();
  await registerPage.fillForm(testUser);
  await registerPage.submit();
  await registerPage.assertSuccess();

  ensureStateDir();
  writeState('test-user.json', testUser);
});
