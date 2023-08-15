/* eslint-disable prettier/prettier */
import { test, expect } from "@playwright/test";

test("Close Single Highlight Opened from 'null' referer", async ({ page }) => {
  await page.goto("/feed/183", { waitUntil: "domcontentloaded" });

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page).toHaveTitle(/Highlight | OpenSauced/);

  const closeBtn = page.getByRole("button", { name: "Close" });
  if (await closeBtn.isVisible()) await closeBtn.click();

  await expect(dialog).toBeHidden();
  await expect(page).toHaveTitle(/Highlights | OpenSauced/);
  await expect(page).toHaveURL(/\/feed/, { timeout: 10000 });
});

test("Close Single Highlight Opened from 'Feed Page' as referer", async ({ page }) => {
  await page.goto("/feed", { waitUntil: "domcontentloaded" });

  const singleHighlight = await page.waitForSelector(`a[href^="${/^\/feed\/\d+$/}"]`);
  if (singleHighlight) await singleHighlight.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page).toHaveTitle(/Highlight | OpenSauced/);

  const closeBtn = page.getByRole("button", { name: "Close" });
  if (await closeBtn.isVisible()) await closeBtn.click();

  await expect(dialog).toBeHidden();
  await expect(page).toHaveTitle(/Highlights | OpenSauced/);
  await expect(page).toHaveURL(/\/feed/, { timeout: 10000 });
});

test("Close Single Highlight Opened from 'User Profile' as referer", async ({ page }) => {
  await page.goto("/user/babblebey", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/user\/babblebey\/highlights/, { timeout: 10000 });

  const highlightUrl = "/feed/183";
  const singleHighlight = await page.waitForSelector(`a[href="${highlightUrl}"]`);
  if (singleHighlight) await singleHighlight.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page).toHaveURL(/\/feed\/183/);

  const closeBtn = page.getByRole("button", { name: "Close" });
  if (await closeBtn.isVisible()) await closeBtn.click();

  await expect(page).toHaveURL(/\/user\/babblebey\/highlights/, { timeout: 10000 });
});
