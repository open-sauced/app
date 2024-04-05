import { test, expect } from "@playwright/test";
import config from "../playwright.config";

test("workspace dashboard has an OG image", async ({ page }) => {
  await page.goto("/workspaces/21c5e583-f1fd-4033-9ec9-7801f67ff727");
  const expectedUrl = `${config.use?.baseURL}/og-images/workspace/21c5e583-f1fd-4033-9ec9-7801f67ff727/30?wname=OpenSauced`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});
