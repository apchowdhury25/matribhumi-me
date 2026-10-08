import { test, expect } from "@playwright/test";

test("admin lead matching, shortlist, and deal pipeline", async ({ page }) => {
  test.setTimeout(60000);
  const stamp = Date.now();
  const buyerName = `Asha Pipeline ${stamp}`;
  const buyerEmail = `asha.pipeline.${stamp}@example.com`;

  await page.goto("/advise");
  await page.locator("input[name=name]").fill(buyerName);
  await page.locator("input[name=email]").fill(buyerEmail);
  await page.locator("input[name=phone]").fill("+8801700112233");
  await page.locator("input[name=residenceCountry]").fill("Bangladesh");
  await page.locator("input[name=preferredCity]").fill("Dhaka");
  await page.locator("input[name=budget]").fill("250000");
  await page.locator("input[name=bedrooms]").fill("3");
  await page.locator("textarea[name=message]").fill("Need a Dhaka apartment shortlist for the advisory pipeline test.");
  await page.locator("input[name=consent]").check();
  await page.getByRole("button", { name: /Talk to an Advisor/i }).click();
  await expect(page.getByRole("heading", { name: "Thank you." })).toBeVisible();

  await page.goto("/admin/login");
  await page.locator("input[name=email]").fill(process.env.ADMIN_EMAIL ?? "admin@matribhumi.me");
  await page.locator("input[name=password]").fill(process.env.ADMIN_PASSWORD ?? "MatriBhumiAdmin!2026");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Today" })).toBeVisible();
  await expect(page.getByRole("link", { name: /New buyer leads/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Qualified leads/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Viewing requests/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Developer introductions/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Active transactions/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Closed transactions/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Follow-ups due/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Developer relationships requiring attention/i })).toBeVisible();

  await page.goto("/admin/pipeline");
  await expect(page.getByRole("heading", { name: "Transaction pipeline" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "New lead" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Developer introduced" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lost / withdrawn" })).toBeVisible();
  await expect(page.getByText(/not guaranteed revenue/i).first()).toBeVisible();

  await page.goto("/admin/follow-ups");
  await expect(page.getByRole("heading", { name: "Follow-ups" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "New follow-up" })).toBeVisible();

  await page.goto("/admin/reports");
  await expect(page.getByRole("heading", { name: "Internal reports" })).toBeVisible();
  await expect(page.getByText(/not guaranteed revenue/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Leads by country" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Transaction pipeline" })).toBeVisible();
  await expect(page.getByText("Developer compensation due").first()).toBeVisible();

  await page.goto("/admin/leads");
  await page.getByRole("link", { name: buyerName }).click();
  await expect(page.getByRole("heading", { name: "Matching" })).toBeVisible();
  await expect(page.getByText(/not an AI recommendation/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Shortlist" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Developer introduction" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Viewing requests" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Transaction history" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Communication notes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Follow-ups" })).toBeVisible();
  await page.locator("form").filter({ has: page.getByRole("button", { name: "Create follow-up" }) }).locator("input[name=dueAt]").fill("2026-10-09");
  await page.locator("form").filter({ has: page.getByRole("button", { name: "Create follow-up" }) }).locator("input[name=task]").fill("Call buyer about shortlist");
  await page.getByRole("button", { name: "Create follow-up" }).click();
  await expect(page.getByText("Call buyer about shortlist").first()).toBeVisible();

  const add = page.getByRole("button", { name: /add to shortlist/i }).first();
  if (await add.isVisible()) {
    await page.locator("input[name=advisorRecommendation]").first().fill("Fits the stated budget and city.");
    await add.click();
    await expect(page.getByRole("button", { name: /save shortlist item/i }).first()).toBeVisible();
  }

  const dealLink = page.getByRole("link", { name: /Deal /i }).first();
  await expect(dealLink).toBeVisible({ timeout: 15000 });
  await dealLink.click();
  await expect(page.getByText(/Viewing → Property Selected → Reservation → Contract → Completion/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Developer introductions" })).toBeVisible();
  await expect(page.getByRole("button", { name: /mark property selected/i })).toBeVisible();
  await expect(page.getByText("MatriBhumi is not the seller.")).toBeVisible();
});
