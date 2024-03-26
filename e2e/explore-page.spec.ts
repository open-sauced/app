import { test, expect, Page } from "@playwright/test";

type TabId = "Dashboard" | "Contributors" | "Activity";
const TabSelectorNames: Record<TabId, string | RegExp> = {
  Dashboard: "Dashboard",
  Contributors: /Contributors\s+\d+/,
  Activity: "Activity",
};

async function checkExploreTabs(page: Page, selectedTabId: TabId) {
  await expect(page.getByRole("link", { name: TabSelectorNames["Dashboard"], exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: TabSelectorNames["Contributors"] })).toBeVisible();
  await expect(page.getByRole("link", { name: TabSelectorNames["Activity"], exact: true })).toBeVisible();

  await expect(
    page.getByRole("tab", { name: TabSelectorNames[selectedTabId], exact: true, selected: true })
  ).toBeVisible();
}

test("Loads explore dashboard page", async ({ page }) => {
  await page.goto("/explore/topic/javascript");
  await checkExploreTabs(page, "Dashboard");
  await expect(page.getByRole("complementary", { name: "pull request highlights", exact: true })).toBeVisible();
});

test("Loads explore contributors page", async ({ page }) => {
  await page.goto("/explore/topic/javascript/contributors");
  await checkExploreTabs(page, "Contributors");

  // simple smoke test until we have actual tables.
  await expect(page.getByRole("button", { name: "7d" })).toBeVisible();
  await expect(page.getByRole("button", { name: "30d" })).toBeVisible();
  await expect(page.getByRole("button", { name: "3m" })).toBeVisible();
});

test("Loads explore activity page", async ({ page }) => {
  await page.goto("/explore/topic/javascript/activity");
  await checkExploreTabs(page, "Activity");

  // a smoke test to ensure the scatterplot is on the page
  await expect(page.getByRole("heading", { name: "Contributor Distribution", exact: true })).toBeVisible();
});
