import { test, expect } from "@playwright/test";
import playwrightConfig from "../playwright.config";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? playwrightConfig.use?.baseURL ?? "http://localhost:3000";

test("Loads user profile page", async ({ page }) => {
  await page.goto("/user/bdougie");

  expect(await page.title()).toBe("bdougie | OpenSauced");

  await expect(page.getByRole("heading", { name: "bdougie", exact: true })).toBeVisible();
});

test("Redirects to user profile page", async ({ page }) => {
  await page.goto("/u/bdougie");

  expect(await page.url()).toBe(`${new URL("/user/bdougie", baseUrl)}`);
});

test("Redirects to user profile page with splat", async ({ page }) => {
  await page.goto("/u/bdougie?tab=contributions&range=180");

  expect(await page.url()).toBe(`${new URL("/user/bdougie?tab=contributions&range=180", baseUrl)}`);
});
