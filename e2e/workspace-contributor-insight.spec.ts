import { test, expect } from "@playwright/test";

const WORKSPACE_ID = "21c5e583-f1fd-4033-9ec9-7801f67ff727";

test.skip("workspace contributor insight page loads", async ({ page }) => {
  await page.goto(`/workspaces/${WORKSPACE_ID}/contributor-insights/40691f9c-e575-4349-a0aa-73beb581f99f/overview`);

  // There is more than one row of users, but we only want the first one to test the login CTA
  // for viewing OSCRs.
  const button = page
    .getByRole("button", { name: "Log in to view Open Source Contributor Rating (OSCR)", exact: true })
    .first();

  expect(button).toBeVisible();
});
