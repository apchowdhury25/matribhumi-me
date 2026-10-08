import { test, expect } from "@playwright/test";

test("pre-launch homepage, waitlist, and brochure", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Find the right property/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Download Brochure" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Join Waitlist" }).first()).toBeVisible();
  await expect(page.getByText(/fictional/i)).toHaveCount(0);
  await expect(page.getByText(/demonstration/i)).toHaveCount(0);
  await expect(page.getByText("Social channels will appear")).toHaveCount(0);
  await expect(page.getByText("House 12, Road 7").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "+880 1700 000000" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Instagram" })).toBeVisible();
  await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  await expect(page.getByRole("link", { name: "WhatsApp" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "For buyers living in two places: frequently asked questions" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Why buyers choose MatriBhumi" }).first()).toBeVisible();
  await expect(page.getByText(/independent property advisor/i).first()).toBeVisible();

  await page.getByRole("button", { name: "Join Waitlist" }).first().click();
  const waitlist = page.getByRole("dialog");
  await expect(waitlist).toBeVisible();
  await expect(waitlist.getByLabel("Full name")).toBeVisible();
  await expect(waitlist.getByLabel("Email")).toBeVisible();
  await expect(waitlist.getByLabel("Country code")).toBeVisible();
  await expect(waitlist.getByLabel("Phone")).toBeVisible();
  await expect(waitlist.getByLabel("Primary interest")).toBeVisible();
  await expect(waitlist.getByRole("option", { name: "Holiday Home" })).toHaveCount(1);
  await expect(waitlist.getByRole("option", { name: "Retirement" })).toHaveCount(1);
  await expect(waitlist.getByRole("option", { name: "Investment" })).toHaveCount(1);
  await waitlist.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "Download Brochure" }).first().click();
  const brochure = page.getByRole("dialog");
  await brochure.getByLabel("Full name").fill("Asha Rahman");
  await brochure.getByLabel("Email").fill("asha@example.com");
  await brochure.getByRole("checkbox").check();
  await brochure.getByRole("button", { name: "Download Brochure" }).click();
  await expect(brochure.getByRole("heading", { name: "Your portfolio is on its way." })).toBeVisible();
});

test("selecting a development moves the Google map", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const map = page.getByTitle(/^Map of /);
  await expect(map).toBeVisible();
  const before = await map.getAttribute("src");
  expect(before).toContain("maps.google.com/maps");
  expect(before).toContain("output=embed");

  const tabs = page.getByRole("tablist", { name: "Developments on the map" }).getByRole("tab");
  const count = await tabs.count();
  expect(count).toBeGreaterThan(1);
  const nextName = (await tabs.nth(1).innerText()).trim();
  await tabs.nth(1).click();
  await expect(page.getByTitle(`Map of ${nextName}`, { exact: false })).toBeVisible();
  const after = await page.getByTitle(/^Map of /).getAttribute("src");
  expect(after).not.toBe(before);
  expect(after).toContain("maps.google.com/maps");
  await expect(
    page.locator("article").filter({ has: page.getByRole("heading", { level: 3, name: nextName }) }).last(),
  ).toBeVisible();
});

test("pre-launch homepage on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Join Waitlist" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Download Brochure" }).first()).toBeVisible();
  const card = page.getByRole("button", { name: "Join Waitlist" }).nth(1);
  await card.scrollIntoViewIfNeeded();
  await expect(card).toBeVisible();
});
