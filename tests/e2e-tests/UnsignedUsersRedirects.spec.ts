import { test, expect } from '@playwright/test';

test('Homepage redirects to /javascript for unsigned users', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.*\/javascript.*/)
});

test('Insights Hub redirects to /javascript for unsigned users', async ({ page }) => {
  await page.goto('/hub/insights');
  await expect(page).toHaveURL(/.*\/javascript.*/)
});
