import { test, expect } from "@playwright/test";

test("Homepage redirects to /feed for unsigned users", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/feed/, { timeout: 20000 });
});
