import { test, expect } from "@playwright/test";

test("admin lead matching, shortlist, and deal pipeline", async ({ page }) => {
  await page.goto("/admin/login");
  await page.locator("input[name=email]").fill(process.env.ADMIN_EMAIL ?? "admin@matribhumi.me");
  await page.locator("input[name=password]").fill(process.env.ADMIN_PASSWORD ?? "MatriBhumiAdmin!2026");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.goto("/admin/leads");
  await page.getByRole("link", { name: "Asha Rahman" }).first().click();
  await expect(page.getByRole("heading", { name: "Matching" })).toBeVisible();
  await expect(page.getByText(/not an AI recommendation/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Shortlist" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Developer introduction" })).toBeVisible();

  const add = page.getByRole("button", { name: /add to shortlist/i }).first();
  if (await add.isVisible()) {
    await page.locator("input[name=advisorRecommendation]").first().fill("Fits the stated budget and city.");
    await add.click();
    await expect(page.getByRole("button", { name: /save shortlist item/i }).first()).toBeVisible();
  }

  const dealLink = page.getByRole("link", { name: /Deal /i }).first();
  await expect(dealLink).toBeVisible();
  await dealLink.click();
  await expect(page.getByText(/Viewing → Property Selected → Reservation → Contract → Completion/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Developer introductions" })).toBeVisible();
  await expect(page.getByRole("button", { name: /mark property selected/i })).toBeVisible();
  await expect(page.getByText("MatriBhumi is not the seller.")).toBeVisible();
});
