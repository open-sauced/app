import { test, expect } from "@playwright/test";
import config from "../playwright.config";

test("Loads a repository page", async ({ page }) => {
  await page.goto("/s/open-sauced/app");

  await expect(page.getByRole("heading", { name: "open-sauced/app", exact: true })).toBeVisible();
  const rangePopup = page.getByRole("button", { name: "Range:", exact: true });
  await expect(rangePopup).toBeVisible();
  await expect(rangePopup).toHaveAttribute("aria-haspopup", "menu");
  await expect(rangePopup).toHaveAttribute("data-state", "closed");

  page.getByRole("button", { name: "Add to Workspace", exact: true }).click();
  await expect(page.getByRole("button", { name: "Share", exact: true })).toBeVisible();

  // check for OG image
  const expectedUrl = `${config.use?.baseURL}/og-images/repository/open-sauced/app/30?description=%F0%9F%8D%95+Insights+into+your+entire+open+source+ecosystem.`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test.describe("large screen", () => {
  test("Adds a repository to a workspace", async ({ page }) => {
    await page.goto("/s/open-sauced/app");

    await page.getByRole("button", { name: "Add to Workspace", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Add repository to Workspace", exact: true });
    await expect(dialog).toBeVisible();

    expect(dialog.getByRole("button", { name: "Connect with GitHub", exact: true })).toBeVisible();
  });

  test("Adds a repository SBOM to a workspace", async ({ page }) => {
    await page.goto("/s/open-sauced/app");

    await page.getByLabel("splitbutton-trigger-add-to-workspace").click();
    await page.getByRole("button", { name: "Workspace from SBOM", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Add repository SBOM to Workspace", exact: true });
    await expect(dialog).toBeVisible();

    expect(dialog.getByRole("button", { name: "Connect with GitHub", exact: true })).toBeVisible();
  });
});

test.describe("small screen", () => {
  test.use({ viewport: { width: 375, height: 629 } });

  test("Adds a repository to a workspace", async ({ page }) => {
    await page.goto("/s/open-sauced/app");

    await page.getByRole("button", { name: "Add to Workspace", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Add repository to Workspace", exact: true });
    await expect(dialog).toBeVisible();
  });

  test("Adds a repository SBOM to a workspace", async ({ page }) => {
    await page.goto("/s/open-sauced/app");

    await page.getByRole("button", { name: "Workspace from SBOM", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Add repository SBOM to Workspace", exact: true });
    await expect(dialog).toBeVisible();
  });
});
