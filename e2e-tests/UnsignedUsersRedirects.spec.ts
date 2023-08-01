import { test, expect } from "@playwright/test";

test("Homepage redirects to /feed for unsigned users", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/.*\/feed.*/, { timeout: 10000 });
});

test("Insights Hub redirects to /feed for unsigned users", async ({ page }) => {
  await page.goto("/hub/insights");
  await expect(page).toHaveURL(/.*\/feed.*/, { timeout: 10000 });
});
