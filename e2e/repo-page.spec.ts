import { test, expect } from "@playwright/test";

test("Loads a repository page", async ({ page }) => {
  await page.goto("/s/open-sauced/app");

  await expect(page.getByRole("heading", { name: "open-sauced/app", exact: true })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Period:", exact: true, expanded: false })).toBeVisible();
});
