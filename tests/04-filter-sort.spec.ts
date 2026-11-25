import { test, expect } from '@playwright/test';
import { ProductListingPage } from './pages/ProductListingPage';
import { AUTH_STATE } from './helpers/state';

test.use({ storageState: AUTH_STATE });

test('Flow 4: Apply Filters and Sorting', async ({ page }) => {
  const listingPage = new ProductListingPage(page);

  await listingPage.goto('/books');

  const countBefore = await listingPage.getProductCount();
  expect(countBefore).toBeGreaterThan(0);

  // Sort by second available option (index 1)
  await listingPage.sortBy(1);
  await listingPage.assertProductsVisible();

  // Switch to list view (optional — skipped if toggle is absent)
  await listingPage.switchToListView();

  // Reduce items per page (optional — skipped if control is absent)
  await listingPage.setPageSize(0);

  await listingPage.assertProductsVisible();

  await page.context().storageState({ path: AUTH_STATE });
});
