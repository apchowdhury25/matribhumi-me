import { test, expect } from "@playwright/test";

test("homepage renders MatriBhumi", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Find the right property/i })).toBeVisible();
});

test("country landings and how it works", async ({ page }) => {
  await page.goto("/locations/bangladesh");
  await expect(page.getByRole("heading", { level: 1, name: /Bangladesh property advisory/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Dhaka" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Chattogram" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bashundhara", exact: true })).toBeVisible();
  await page.goto("/how-it-works");
  await expect(page.getByText("Share your requirements.").first()).toBeVisible();
  await expect(page.getByText("MatriBhumi is not the seller.").first()).toBeVisible();
  await page.goto("/advise");
  await expect(page.getByRole("heading", { level: 1, name: /Talk to a property advisor/i })).toBeVisible();
  await page.goto("/for-developers");
  await expect(page.getByRole("heading", { level: 1, name: /Are you a property developer/i })).toBeVisible();
  await expect(page.getByText(/Reach qualified buyers looking at selected Bangladesh developments/i).first()).toBeVisible();
  await expect(page.getByText(/guaranteed sales/i).first()).toBeVisible();
});

test("former UAE and Malaysia URLs redirect to locations", async ({ page }) => {
  await page.goto("/locations/uae");
  await expect(page).toHaveURL(/\/locations\/?$/);
  await page.goto("/locations/malaysia");
  await expect(page).toHaveURL(/\/locations\/?$/);
});

test("legal disclosure pages", async ({ page }) => {
  await page.goto("/disclaimer/buyer-fee");
  await expect(page.getByRole("heading", { level: 1, name: "Buyer Fee Disclosure" })).toBeVisible();
  await expect(
    page.getByText(/MatriBhumi does not charge buyers a property brokerage or consultation fee for its core property advisory service/i).first(),
  ).toBeVisible();
  await page.goto("/legal/bangladesh");
  await expect(page.getByRole("heading", { level: 1, name: "Bangladesh legal information" })).toBeVisible();
  await expect(page.getByText(/not legal advice/i).first()).toBeVisible();
});

test("properties search and filter", async ({ page }) => {
  await page.goto("/properties");
  await page.getByPlaceholder("Search").fill("Heights");
  await page.getByRole("button", { name: /apply/i }).click();
  await expect(page.getByRole("heading", { name: /Heights/i }).first()).toBeVisible();
});

test("property detail and inquiry", async ({ page }) => {
  await page.goto("/properties/heights-residences");
  await expect(page.getByRole("heading", { name: "Heights Residences" })).toBeVisible();
  await expect(page.getByText("Unpublished partner")).toHaveCount(0);
  await expect(page.getByText("MatriBhumi Developments")).toHaveCount(0);
  await page.locator("#inquire input[name=name]").fill("Asha Rahman");
  await page.locator("#inquire input[name=email]").fill("asha@example.com");
  await page.locator("#inquire input[name=phone]").fill("+88017000000");
  await page.locator("#inquire input[name=country]").fill("Bangladesh");
  await page.locator("#inquire textarea[name=message]").fill("Please share the demonstration brochure and unit mix.");
  await page.locator("#inquire input[name=consent]").check();
  await page.locator("#inquire button[type=submit]").click();
  await expect(page.getByText(/Thank you/i)).toBeVisible();
});

test("admin login", async ({ page }) => {
  await page.goto("/admin/login");
  await page.locator("input[name=email]").fill(process.env.ADMIN_EMAIL ?? "admin@matribhumi.me");
  await page.locator("input[name=password]").fill(process.env.ADMIN_PASSWORD ?? "MatriBhumiAdmin!2026");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
