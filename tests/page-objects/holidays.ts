import { Page } from '@playwright/test';

export class Holidays {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.locator('data-testid=btn-holidays').click();
  }

  async clickGetBrochure(holiday: string) {
    await this.page
      .locator('data-testid=holiday-card', {
        has: this.page.locator(`text=${holiday}`),
      })
      .locator('data-testid=btn-brochure')
      .click();
  }
}
