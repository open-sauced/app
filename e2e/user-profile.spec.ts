import { test, expect } from "@playwright/test";
import config from "../playwright.config";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? config.use?.baseURL ?? "http://localhost:3000";

test("Loads user profile page", async ({ page }) => {
  await page.goto("/u/bdougie");

  expect(await page.title()).toBe("bdougie | OpenSauced");

  await expect(page.getByRole("heading", { name: "bdougie", exact: true })).toBeVisible();

  // Check for the OG image
  const expectedUrl = `${config.use?.baseURL}/og-images/dev-card?username=bdougie`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  // Check for login button for viewing OSCR
  await page
    .getByRole("button", { name: "Log in to view  Open Source Contributor Rating (OSCR)", exact: true })
    .click();

  await expect(page.url()).toContain("https://github.com/login");
});

test("Loads user dev card page", async ({ page }) => {
  await page.goto("/u/bdougie/card");

  expect(await page.title()).toBe("bdougie | OpenSauced");

  // Check for the OG image
  const expectedUrl = `${config.use?.baseURL}/og-images/dev-card?username=bdougie`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("Redirects to user profile page", async ({ page }) => {
  await page.goto("/user/bdougie");

  expect(await page.url()).toBe(`${new URL("/u/bdougie", baseUrl)}`);
});

test("Redirects to user profile page with splat", async ({ page }) => {
  await page.goto("/user/bdougie?tab=contributions&range=180");

  expect(await page.url()).toBe(`${new URL("/u/bdougie?tab=contributions&range=180", baseUrl)}`);
});
