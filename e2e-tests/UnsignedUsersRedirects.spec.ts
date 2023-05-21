import { test, expect } from "@playwright/test";

test("Homepage redirects to /javascript for unsigned users", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/.*\/javascript.*/, { timeout: 10000 });
});

test("Insights Hub redirects to /javascript for unsigned users", async ({ page }) => {
  await page.goto("/hub/insights");
  await expect(page).toHaveURL("http://localhost:3000/javascript/dashboard/filter/recent?redirectedFrom=%2Fhub%2Finsights", { timeout: 10000 });
});
