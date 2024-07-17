import { test, expect } from "@playwright/test";

const WORKSPACE_ID = "21c5e583-f1fd-4033-9ec9-7801f67ff727";

test("workspace activity page loads", async ({ page }) => {
  await page.goto(`/workspaces/${WORKSPACE_ID}/activity`);

  await expect(page.getByRole("tab", { name: "Activity", exact: true })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Filter", exact: true })).toBeHidden();
  await expect(page.getByRole("combobox", { name: "Period:30d", exact: true })).toBeHidden();
  await expect(page.getByRole("combobox", { name: "Limit:10 per page", exact: true })).toBeHidden();

  const table = page.getByRole("table", { name: "Pull Requests", exact: true });
  const thead = table.locator("thead");
  await expect(table).toBeVisible();
  await expect(thead).toBeVisible();

  await expect(thead.getByText("State")).toBeVisible();
  await expect(thead.getByText("Pull Request")).toBeVisible();
  await expect(thead.getByText("Changed Files	")).toBeVisible();
  await expect(thead.getByText("Changes")).toBeVisible();
  await expect(thead.getByText("Updated At")).toBeVisible();
  await expect(thead.getByText("Created At")).toBeVisible();
  await expect(thead.getByText("Closed At")).toBeVisible();
  await expect(thead.getByText("Merged At")).toBeVisible();

  await expect(table.locator("tbody").locator("tr")).toHaveCount(10);

  // Ensure the StarSearch for Workspaces CTA is visible
  const starSearchButton = await page.getByRole("button", { name: "Sign in to use StarSearch", exact: true });
  await expect(starSearchButton).toHaveAttribute("aria-disabled", "false");
  await expect(starSearchButton).toBeVisible();
});

test.describe("{ width: 640, height: 1136 }", () => {
  test.use({ viewport: { width: 640, height: 1136 } });
  test("workspace activity page (small screen)", async ({ page }) => {
    await page.goto(`/workspaces/${WORKSPACE_ID}/activity`);

    await expect(page.getByRole("tab", { name: "Activity", exact: true })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Filter", exact: true })).toBeHidden();
    await expect(page.getByRole("combobox", { name: "Period:30d", exact: true })).toBeHidden();
    await expect(page.getByRole("combobox", { name: "Limit:10 per page", exact: true })).toBeHidden();

    const table = page.getByRole("table", { name: "Pull Requests", exact: true });
    const thead = table.locator("thead");
    await expect(table).toBeVisible();
    await expect(thead).toBeVisible();

    await expect(thead.getByText("Pull Requests")).toBeVisible();
    await expect(table.locator("tbody").locator("tr")).toHaveCount(10);

    // Ensure the StarSearch for Workspaces CTA is visible
    const starSearchButton = await page.getByRole("button", { name: "Sign in to use StarSearch", exact: true });
    await expect(starSearchButton).toHaveAttribute("aria-disabled", "false");
    await expect(starSearchButton).toBeVisible();
  });
});
