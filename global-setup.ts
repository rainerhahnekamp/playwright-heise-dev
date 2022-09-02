import { chromium, firefox, FullConfig, webkit } from "@playwright/test";

async function globalSetup() {
  for (const browserType of [chromium, firefox, webkit]) {
    const browser = await browserType.launch();
    const page = await browser.newPage();
    await page.goto("https://genuine-narwhal-f0f8ad.netlify.app/");
    await page.locator("data-testid=btn-sign-in").click();
    await page.locator("input[name=email]").fill("john.list@host.com");
    await page.locator("input[name=password]").fill("John List");
    await page.locator("button[type=submit]").click();
    await page
      .locator("data-testid=p-username", { hasText: "John List" })
      .waitFor();

    await page
      .context()
      .storageState({ path: `john-list.${browserType.name()}.json` });
    await page.close();
  }
}

export default globalSetup;
