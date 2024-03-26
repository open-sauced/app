import { test, expect, Page } from "@playwright/test";

type TabId = "Dashboard" | "Contributors" | "Activity";
const TabSelectorNames: Record<TabId, string | RegExp> = {
  Dashboard: "Dashboard",
  Contributors: /Contributors\s+\d+/,
  Activity: "Activity",
};

async function checkExploreTabs(page: Page, tabId: TabId) {
  await expect(page.getByRole("link", { name: TabSelectorNames["Dashboard"] })).toBeVisible();
  await expect(page.getByRole("link", { name: TabSelectorNames["Contributors"] })).toBeVisible();
  await expect(page.getByRole("link", { name: TabSelectorNames["Activity"] })).toBeVisible();

  await expect(page.getByRole("tab", { name: TabSelectorNames[tabId], exact: true })).toHaveAttribute(
    "aria-selected",
    "true"
  );
}

test("Loads explore dashboard page", async ({ page }) => {
  await page.goto("/explore/topic/javascript");
  await checkExploreTabs(page, "Dashboard");
  await expect(page.getByRole("complementary", { name: "pull request highlights", exact: true })).toBeVisible();
});

test("Loads explore contributors page", async ({ page }) => {
  await page.goto("/explore/topic/javascript/contributors");
  await checkExploreTabs(page, "Contributors");
});

test("Loads explore activity page", async ({ page }) => {
  await page.goto("/explore/topic/javascript/activity");
  await checkExploreTabs(page, "Activity");
});
