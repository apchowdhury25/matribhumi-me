import { test, expect } from "@playwright/test";

test("homepage renders MatriBhumi", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /A home in Bangladesh/i })).toBeVisible();
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
