import { test, expect } from "@playwright/test";

test("advisory form collects requirements and confirms advisor follow-up", async ({ page }) => {
  await page.goto("/advise");
  await expect(page.getByRole("heading", { level: 1, name: /Talk to a property advisor/i })).toBeVisible();
  await expect(
    page.getByText(
      "MatriBhumi does not charge buyers a property brokerage or consultation fee. Where applicable, MatriBhumi is compensated by participating developers under separate agreements.",
    ).first(),
  ).toBeVisible();

  await page.locator("input[name=name]").fill("Asha Rahman");
  await page.locator("input[name=email]").fill("asha.advisor@example.com");
  await page.locator("input[name=phone]").fill("+447700900123");
  await page.locator("input[name=residenceCountry]").fill("United Kingdom");
  await page.locator("input[name=preferredCity]").fill("Dhaka");
  await page.locator("input[name=budget]").fill("250000");
  await page.locator("input[name=bedrooms]").fill("3");
  await page.locator("textarea[name=message]").fill("Looking for a family apartment near schools in Dhaka.");
  await page.locator("input[name=consent]").check();
  await page.getByRole("button", { name: /Talk to an Advisor/i }).click();

  await expect(page.getByRole("heading", { name: "Thank you." })).toBeVisible();
  await expect(
    page.getByText("Your MatriBhumi property advisor will review your requirements and contact you."),
  ).toBeVisible();
});
