import { test, expect } from "@playwright/test";

test("Redirects to /workspaces/new from /hub/insights/new (logged out user)", async ({ page }) => {
  await page.goto("/hub/insights/new");

  expect(page.url()).toContain("/workspaces/new");
});
