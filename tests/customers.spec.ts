import { test, expect } from "@playwright/test";

test("should add a new customer", async ({ page }) => {
  await page.goto("https://genuine-narwhal-f0f8ad.netlify.app/");

  await page.locator("data-testid=btn-customers").click();

  await page.locator("data-testid=btn-add-customer").click();

  await page.locator("data-testid=inp-firstname").fill("Luise");

  await page.locator("data-testid=inp-lastname").fill("Dervist");

  await page.locator("data-testid=inp-country").click();

  await page.locator("text=Greece").click();

  await page.locator("data-testid=inp-birthdate").fill("12.9.2001");

  await page.locator("data-testid=btn-submit").click();

  await expect(
    page.locator("data-testid=row-customer", {
      hasText: "Dervist, Luise",
    })
  ).toBeVisible();
});
