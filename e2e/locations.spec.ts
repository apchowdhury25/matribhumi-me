import { test, expect } from "@playwright/test";

test("landing shows only Dhaka and Chattogram city cards", async ({ page }) => {
  await page.goto("/");
  const explore = page.locator("section").filter({ has: page.getByRole("heading", { name: "Explore Properties by City" }) });
  await expect(explore.getByRole("heading", { name: "Dhaka" })).toBeVisible();
  await expect(explore.getByRole("heading", { name: "Chattogram" })).toBeVisible();
  await expect(explore.getByRole("heading", { name: "Gulshan" })).toHaveCount(0);
  await expect(explore.getByRole("heading", { name: "Khulshi" })).toHaveCount(0);
  await expect(explore.getByRole("heading", { name: "Bashundhara R/A" })).toHaveCount(0);
});

test("Dhaka city page lists neighborhoods and opens a neighborhood", async ({ page }) => {
  await page.goto("/locations/dhaka");
  await expect(page.getByRole("heading", { level: 1, name: "Dhaka" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Explore Dhaka Neighborhoods" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Gulshan" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bashundhara R/A" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Purbachal" })).toBeVisible();
  await page.getByRole("link", { name: /Bashundhara R\/A/i }).first().click();
  await expect(page).toHaveURL(/\/locations\/dhaka\/bashundhara\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: "Bashundhara R/A" })).toBeVisible();
  await expect(page.getByText("Dhaka, Bangladesh").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heights Residences" })).toBeVisible();
});

test("Chattogram city page lists Khulshi and Nasirabad", async ({ page }) => {
  await page.goto("/locations/chattogram");
  await expect(page.getByRole("heading", { level: 1, name: "Chattogram" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Khulshi", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Nasirabad Housing Society" })).toBeVisible();
});

test("empty neighborhood shows a polished empty state", async ({ page }) => {
  await page.goto("/locations/dhaka/gulshan");
  await expect(page.getByRole("heading", { level: 1, name: "Gulshan" })).toBeVisible();
  await expect(page.getByText("No properties available in this neighborhood yet.")).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore other neighborhoods in Dhaka/i })).toBeVisible();
});

test("legacy Bashundhara URL redirects to the Dhaka neighborhood page", async ({ page }) => {
  await page.goto("/locations/bashundhara");
  await expect(page).toHaveURL(/\/locations\/dhaka\/bashundhara\/?$/);
});

test("property filters limit neighborhoods to the selected city", async ({ page }) => {
  await page.goto("/properties");
  const city = page.getByLabel("City");
  const neighborhood = page.getByLabel("Neighborhood");
  await city.selectOption("dhaka");
  await expect(neighborhood.locator('option[value="gulshan"]')).toHaveCount(1);
  await expect(neighborhood.locator('option[value="khulshi"]')).toHaveCount(0);
  await city.selectOption("chattogram");
  await expect(neighborhood.locator('option[value="khulshi"]')).toHaveCount(1);
  await expect(neighborhood.locator('option[value="gulshan"]')).toHaveCount(0);
});
