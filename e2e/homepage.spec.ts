import { test, expect } from "@playwright/test";

test("Loads home page (logged out user)", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "OpenSauced", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Highlights", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Connect with GitHub", exact: true })).toBeVisible();

  await expect(page.getByRole("complementary", { name: "Top Contributors", exact: true })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Repositories", exact: true })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Featured Highlights", exact: true })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Subscribe to our newsletter", exact: true })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Introducing StarSearch!", exact: true })).toBeVisible();
});
