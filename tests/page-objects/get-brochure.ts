import { Page } from "@playwright/test";

export class GetBrochure {
  readonly lookupResult;
  constructor(private page: Page) {
    this.lookupResult = this.page.locator("data-testid=lookup-result");
  }

  async setAddress(address: string) {
    await this.page.locator("data-testid=address").fill(address);
  }

  async search() {
    await this.page.locator("data-testid=btn-search").click();
  }
}
