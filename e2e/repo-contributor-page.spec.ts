import { test, expect } from "@playwright/test";

test("Loads a repository contributor page", async ({ page }) => {
  await page.goto("/s/open-sauced/app/contributors?range=30");

  await expect(page.getByRole("heading", { name: "open-sauced/app", exact: true })).toBeVisible();
  const rangePopup = page.getByRole("button", { name: "Range:", exact: true });
  await expect(rangePopup).toBeVisible();
  await expect(rangePopup).toHaveAttribute("aria-haspopup", "menu");
  await expect(rangePopup).toHaveAttribute("data-state", "closed");

  // The contributor page should have it's graph set to enhance by default and to not show bots by default.
  const enhanceSwitch = page.getByRole("switch", { name: "Enhance", exact: true });
  await expect(enhanceSwitch).toBeVisible();
  await expect(enhanceSwitch).toHaveAttribute("aria-checked", "true");

  const showBotsSwitch = page.getByRole("switch", { name: "Show Bots", exact: true });
  await expect(showBotsSwitch).toBeVisible();
  await expect(showBotsSwitch).toHaveAttribute("aria-checked", "false");

  const prToggleGroup = page.getByRole("group", { name: "Pull Request State", exact: true });
  await expect(prToggleGroup).toBeVisible();

  // All PRs should be selected by default.
  const allPrsRadio = prToggleGroup.getByRole("radio", { name: /All PRs\d+/, exact: true });
  await expect(allPrsRadio).toBeVisible();
  await expect(allPrsRadio).toHaveAttribute("aria-checked", "true");

  const openPrsRadio = prToggleGroup.getByRole("radio", { name: /Open\d+/, exact: true });
  await expect(openPrsRadio).toBeVisible();
  await expect(openPrsRadio).toHaveAttribute("aria-checked", "false");

  const closePRsRadio = prToggleGroup.getByRole("radio", { name: /Closed\d+/, exact: true });
  await expect(closePRsRadio).toBeVisible();
  await expect(closePRsRadio).toHaveAttribute("aria-checked", "false");
});
