import { test as base, expect } from '@playwright/test';
import { GetBrochure } from './page-objects/get-brochure';
import { Holidays } from './page-objects/holidays';

const test = base.extend<{ holidays: Holidays; getBrochure: GetBrochure }>({
  holidays: async ({ page }, use) => {
    await use(new Holidays(page));
  },
  getBrochure: async ({ page }, use) => {
    await use(new GetBrochure(page));
  },
});

test.describe('Advanced Holidays', () => {
  test('sanity test', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('data-testid=p-username')).toHaveText(
      'Welcome John List'
    );
  });

  for (const { response, lookupResult } of [
    { response: [], lookupResult: 'Address not found' },
    { response: [true], lookupResult: 'Brochure sent' },
  ]) {
    test(`should return ${lookupResult} for nominatim response ${response}`, async ({
      page,
      holidays,
      getBrochure,
    }) => {
      await page.goto('');
      await holidays.navigateTo();
      page.route(/nominatim/, (route) =>
        route.fulfill({
          status: 200,
          body: JSON.stringify(response),
        })
      );
      await holidays.clickGetBrochure('London');
      await getBrochure.setAddress('Domgasse 5');
      await getBrochure.search();
      await expect(getBrochure.lookupResult).toHaveText(lookupResult);
    });
  }
});
