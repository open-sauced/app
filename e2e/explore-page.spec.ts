import { test, expect } from "@playwright/test";

test("Loads explore dashboard page", async ({ page }) => {
  await page.goto("/explore/topic/javascript");
  await expect(page.getByRole("complementary", { name: "pull request highlights", exact: true })).toBeVisible();
});
