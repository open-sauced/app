import { test, expect } from '@playwright/test';

test('Homepage redirects to /javascript for unsigned users', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL(/.*\/javascript.*/)
});

test('Insights Hub redirects to /javascript for unsigned users', async ({ page }) => {
  await page.goto('/hub/insights');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL(/.*\/javascript.*/)
});
