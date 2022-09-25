import { test, expect } from "@playwright/test";

test.describe("initial test", () => {
  test("holidays", async ({ page }) => {
    await page.goto("");
    await page.locator("[data-testid=btn-holidays]").click();

    await expect(page.locator("mat-drawer-content")).toContainText(
      "Choose among our Holidays"
    );
  });
});
