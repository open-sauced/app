import { test, expect } from "@playwright/test";
import config from "../playwright.config";

test("Loads a repository page", async ({ page }) => {
  await page.goto("/s/open-sauced/app");

  await expect(page.getByRole("heading", { name: "open-sauced/app", exact: true })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Period:", exact: true, expanded: false })).toBeVisible();
});

test("repository page has an OG image", async ({ page }) => {
  await page.goto("/s/open-sauced/app");
  const expectedUrl = `${config.use?.baseURL}/og-images/repository/open-sauced/app/30?description=%F0%9F%8D%95+The+path+to+your+next+contribution.`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});
