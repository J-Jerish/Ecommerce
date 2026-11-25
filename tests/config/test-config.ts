/**
 * Central configuration for the test suite.
 * Any value can be overridden via environment variables,
 * making the suite portable across environments (local / staging / CI).
 */
export const config = {
  user: {
    firstName: process.env.USER_FIRST_NAME ?? 'Test',
    lastName: process.env.USER_LAST_NAME ?? 'User',
    password: process.env.USER_PASSWORD ?? 'Test@1234',
  },

  address: {
    country: process.env.ADDRESS_COUNTRY ?? 'India',
    city: process.env.ADDRESS_CITY ?? 'Chennai',
    address1: process.env.ADDRESS_LINE1 ?? '123 Test Street',
    zip: process.env.ADDRESS_ZIP ?? '600001',
    phone: process.env.ADDRESS_PHONE ?? '9876543210',
  },

  search: {
    term: process.env.SEARCH_TERM ?? 'Fiction',
  },

  coupon: {
    code: process.env.COUPON_CODE ?? 'DiscountCoupon50',
  },
} as const;

export type Config = typeof config;
