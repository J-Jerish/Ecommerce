import { test } from '@playwright/test';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { readState, AUTH_STATE } from './helpers/state';

interface ProductState {
  name: string;
  url: string;
  price: string;
}

test.use({ storageState: AUTH_STATE });

let product: ProductState;

test.beforeAll(() => {
  product = readState<ProductState>('product-state.json');
});

test('Flow 5: Open Product Details', async ({ page }) => {
  const detailPage = new ProductDetailPage(page);

  await detailPage.goto(product.url);
  await detailPage.assertLoaded(product.name);

  await page.context().storageState({ path: AUTH_STATE });
});
