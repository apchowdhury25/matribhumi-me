import { test, expect, type Page } from "@playwright/test";

const pages = [
  "/",
  "/properties",
  "/properties/heights-residences",
  "/projects",
  "/locations/bashundhara",
  "/about",
  "/contact",
  "/insights",
];

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
];

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
    };
  });
  expect(
    overflow.scrollWidth,
    `horizontal overflow ${overflow.scrollWidth} vs ${overflow.clientWidth}`,
  ).toBeLessThanOrEqual(overflow.clientWidth + 2);
}

for (const vp of viewports) {
  test.describe(`mobile ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const path of pages) {
      test(`${path} does not overflow`, async ({ page }) => {
        const res = await page.goto(path, { waitUntil: "domcontentloaded" });
        expect(res?.ok() || res?.status() === 304).toBeTruthy();
        await page.waitForTimeout(250);
        await noHorizontalOverflow(page);
      });
    }

    test("header menu and search open", async ({ page }) => {
      await page.goto("/");
      const menu = page.getByRole("button", { name: /open menu/i });
      if (await menu.isVisible()) {
        await menu.click();
        await expect(page.getByRole("link", { name: "Developments" }).last()).toBeVisible();
        await page.getByRole("button", { name: /close menu/i }).click();
      }
      await page.getByRole("button", { name: "Search" }).click();
      await expect(page.getByPlaceholder(/search/i)).toBeVisible();
    });
  });
}

test("property inquiry form is usable at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/properties/heights-residences");
  await page.locator("#inquire input[name=name]").fill("Asha Rahman");
  await page.locator("#inquire input[name=email]").fill("asha@example.com");
  await page.locator("#inquire input[name=phone]").fill("+88017000000");
  await page.locator("#inquire input[name=country]").fill("Bangladesh");
  await page.locator("#inquire textarea[name=message]").fill("Please share unit mix for a winter stay.");
  await page.locator("#inquire input[name=consent]").check();
  await page.locator("#inquire button[type=submit]").click();
  await expect(page.getByText(/Thank you/i)).toBeVisible();
});
