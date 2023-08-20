import { test, expect } from "@playwright/test";

test("Open a User (with GitHub Account Connected) Profile", async ({ page }) => {
  await page.goto("/user/babblebey", { waitUntil: "domcontentloaded" });

  await expect(page).toHaveURL(/\/user\/babblebey/, { timeout: 10000 });
  await expect(page).toHaveTitle(/babblebey | OpenSauced/);
  await expect(page.getByRole("heading", { name: "babblebey" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Avatar" })).toBeVisible();
  await expect(page.getByRole("img", { name: "user profile cover image" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get Card" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
  await expect(page.getByRole("tab")).toBeVisible();
});

test("Open a User (without Github Account Connected) Profile", async ({ page }) => {
  await page.goto("/user/githubuser", { waitUntil: "domcontentloaded" });

  await expect(page).toHaveURL("/user/githubuser", { timeout: 10000 });
  await expect(page).toHaveTitle(/githubuser | OpenSauced/);
  await expect(page.getByRole("heading", { name: "githubuser" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Avatar" })).toBeHidden();
  await expect(page.getByRole("img", { name: "user profile cover image" })).toBeHidden();
  await expect(page.getByRole("link", { name: "Get Card" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Share" })).toBeHidden();
  await expect(page.getByRole("tab")).toBeHidden();
  await expect(page.getByRole("heading", { name: "Contribution Insights" })).toBeVisible();
});
