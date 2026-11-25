# DemoWebShop Test Automation Framework

A Playwright-based end-to-end test automation framework built with TypeScript, following the Page Object Model (POM) design pattern and TestNG-style sequential flows. Targets the [DemoWebShop by Tricentis](https://demowebshop.tricentis.com) application for full e-commerce journey testing.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5.7 |
| Build Tool | npm |
| Test Framework | Playwright 1.63 |
| Browser | Chromium |
| Design Pattern | Page Object Model (POM) |
| CI/CD | GitHub Actions |
| Linting | ESLint + @typescript-eslint |

## Project Structure

```
tests/
 ├── pages/              # Page Objects
 │    ├── BasePage.ts     - Abstract base with shared utilities
 │    ├── RegisterPage.ts
 │    ├── LoginPage.ts
 │    ├── HomePage.ts
 │    ├── SearchResultsPage.ts
 │    ├── ProductListingPage.ts
 │    ├── ProductDetailPage.ts
 │    ├── CartPage.ts
 │    ├── CheckoutPage.ts
 │    ├── OrderConfirmationPage.ts
 │    └── AccountPage.ts
 ├── config/
 │    └── test-config.ts  - Centralized configuration with env-var overrides
 ├── helpers/
 │    └── state.ts        - JSON state file utilities for cross-flow data sharing
 ├── state/              # Runtime-generated (gitignored)
 │    ├── test-user.json  - Dynamically created user credentials
 │    ├── auth-state.json - Browser session / cookies
 │    ├── product-state.json
 │    ├── cart-state.json
 │    └── order-state.json
 ├── 01-register.spec.ts
 ├── 02-login.spec.ts
 ├── 03-search-product.spec.ts
 ├── 04-filter-sort.spec.ts
 ├── 05-product-details.spec.ts
 ├── 06-add-to-cart.spec.ts
 ├── 07-update-cart.spec.ts
 ├── 08-apply-coupon.spec.ts
 ├── 09-checkout.spec.ts
 ├── 10-payment.spec.ts
 ├── 11-order-confirmation.spec.ts
 ├── 12-order-history.spec.ts
 └── 13-logout.spec.ts
playwright.config.ts     - Global Playwright configuration
.env.example             - Environment variable reference
.github/workflows/
 └── playwright.yml      - CI/CD pipeline
```

## Key Design Decisions

- **Page Object Model** separates test logic from UI interaction, making tests readable and maintainable
- **Dynamic user creation** generates a unique timestamped email on every run, ensuring test isolation with no shared state
- **Session persistence via storageState** passes authenticated browser cookies across spec files without re-logging in for each flow
- **JSON state files** carry runtime data (user credentials, product URLs, order numbers) between sequential flows
- **Sequential execution** (`workers: 1`) enforces the correct e-commerce order: register → login → browse → cart → checkout → confirm
- **Multi-environment config** supports switching base URL and settings without code changes, using environment variable overrides

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Chrome / Chromium (installed automatically by Playwright)

### Install Dependencies

```bash
npm install
npx playwright install chromium
```

### Run All 13 Flows

```bash
npm test
```

### Run in Headed Mode (see the browser)

```bash
npm run test:headed
```

### Run a Single Flow

```bash
npm run test:flow1    # Register
npm run test:flow2    # Login
# ... through
npm run test:flow13   # Logout
```

## Configuration

Default settings in `tests/config/test-config.ts`. Override any value with environment variables or a `.env` file (see `.env.example`):

```
BASE_URL=https://demowebshop.tricentis.com
```

| Property | Default | Description |
|---|---|---|
| `BASE_URL` | `https://demowebshop.tricentis.com` | Target application URL |
| `headless` | `false` locally, `true` in CI | Run browser without UI |
| `timeout` | `90000ms` | Per-test timeout |
| `retries` | `0` locally, `2` in CI | Retry count for flaky tests |

## Test Flows

| Flow | Spec File | Description |
|---|---|---|
| 1 | `01-register.spec.ts` | Register a new account with a unique timestamped email |
| 2 | `02-login.spec.ts` | Log in with the registered user |
| 3 | `03-search-product.spec.ts` | Search for a product by keyword |
| 4 | `04-filter-sort.spec.ts` | Apply filters and sort the product listing |
| 5 | `05-product-details.spec.ts` | Open product detail page and verify content |
| 6 | `06-add-to-cart.spec.ts` | Add the product to the shopping cart |
| 7 | `07-update-cart.spec.ts` | Update product quantity in the cart |
| 8 | `08-apply-coupon.spec.ts` | Attempt to apply a discount coupon |
| 9 | `09-checkout.spec.ts` | Enter billing and shipping address |
| 10 | `10-payment.spec.ts` | Select shipping method and payment options |
| 11 | `11-order-confirmation.spec.ts` | Confirm the order and capture order number |
| 12 | `12-order-history.spec.ts` | Verify the order appears in account history |
| 13 | `13-logout.spec.ts` | Log out and verify session is terminated |

## Test Reports

After execution, Playwright generates an HTML report:

```bash
npx playwright show-report
```

| Report | Location |
|---|---|
| HTML Report | `playwright-report/index.html` |
| Screenshots | `~/playwright-results/` (failures only) |
| Videos | `~/playwright-results/` (failures only) |
| Traces | `~/playwright-results/` (failures only) |
