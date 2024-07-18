import { test, expect } from "@playwright/test";
import config from "../playwright.config";

const WORKSPACE_ID = "21c5e583-f1fd-4033-9ec9-7801f67ff727";

test("workspace dashboard page loads", async ({ page }) => {
  await page.goto(`/workspaces/${WORKSPACE_ID}`);
  const expectedUrl = `${config.use?.baseURL}/og-images/workspace/${WORKSPACE_ID}/30?wname=OpenSauced`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  // The welcome modal should be visible
  const dialog = await page.getByRole("dialog", { name: "Welcome to Workspaces", exact: true });

  // In case this screen size test runs first and the welcome modal no longer loads because the local storage is set to no longer show it.
  if (await dialog.isVisible()) {
    await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  }

  const starSearchButton = await page.getByRole("button", { name: "Sign in to use StarSearch", exact: true });
  await expect(starSearchButton).toHaveAttribute("aria-disabled", "false");
  await expect(starSearchButton).toBeVisible();
});

test.describe("{ width: 640, height: 1136 }", () => {
  test.use({ viewport: { width: 640, height: 1136 } });

  test("workspace dashboard page loads", async ({ page }) => {
    await page.goto(`/workspaces/${WORKSPACE_ID}`);
    const expectedUrl = `${config.use?.baseURL}/og-images/workspace/${WORKSPACE_ID}/30?wname=OpenSauced`;

    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

    // The welcome modal should be visible
    const dialog = await page.getByRole("dialog", { name: "Welcome to Workspaces", exact: true });

    // In case this screen size test runs first and the welcome modal no longer loads because the local storage is set to no longer show it.
    if (await dialog.isVisible()) {
      await dialog.getByRole("button", { name: "Close", exact: true }).click();
    }

    const starSearchButton = await page.getByRole("button", { name: "Sign in to use StarSearch", exact: true });
    await expect(starSearchButton).toHaveAttribute("aria-disabled", "false");
    await expect(starSearchButton).toBeVisible();
  });
});
