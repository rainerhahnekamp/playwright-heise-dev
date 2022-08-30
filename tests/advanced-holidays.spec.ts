import { test, expect } from "@playwright/test";

test.use({ storageState: "john-list.json" });

test.describe("Advanced Holidays", () => {
  test("sign-in test", async ({ page }) => {
    await page.goto("");

    await expect(page.locator("data-testid=p-username")).toHaveText(
      "Welcome John List"
    );
  });
});
