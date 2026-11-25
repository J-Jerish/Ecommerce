import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { config } from './config/test-config';
import { writeState, AUTH_STATE } from './helpers/state';

test.use({ storageState: AUTH_STATE });

test('Flow 3: Search Product', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResults = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.search(config.search.term);

  await searchResults.assertResultsVisible();

  const product = await searchResults.getFirstProductInfo();
  writeState('product-state.json', product);

  await page.context().storageState({ path: AUTH_STATE });
});
