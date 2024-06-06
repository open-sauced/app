import { test, expect } from "@playwright/test";
import config from "../playwright.config";
import { starSearchResponse } from "./fixtures/star-search/streamResponse";

test("StarSearch (Logged Out Flow)", async ({ page }) => {
  await page.goto("/star-search");

  expect(await page.getByRole("list", { name: "suggested prompts" })).toBeVisible();
  expect(await page.getByRole("heading", { name: "StarSearch" })).toBeVisible();
  expect(await page.getByRole("heading", { name: "Copilot, but for git history" })).toBeVisible();

  // Ensure all suggestions are present
  const firstSuggestsion = await page.getByRole("button", {
    name: "Get information on contributor activity",
    exact: true,
  });
  expect(firstSuggestsion).toBeVisible();

  const firstSuggestsionSelector = `#${await firstSuggestsion.getAttribute("aria-describedby")}`;
  expect(page.locator(firstSuggestsionSelector)).toHaveText(
    "What type of pull requests has @brandonroberts worked on?"
  );

  const secondSuggestion = await page.getByRole("button", { name: "Identify key contributors", exact: true });
  expect(secondSuggestion).toBeVisible();

  const secondSuggestionDescription = `#${await secondSuggestion.getAttribute("aria-describedby")}`;
  expect(page.locator(secondSuggestionDescription)).toHaveText(
    "Who are the most prevalent contributors to the TypeScript ecosystem?"
  );

  const thirdSuggestion = await page.getByRole("button", {
    name: "Find contributors based on their work",
    exact: true,
  });
  expect(thirdSuggestion).toBeVisible();

  const thirdSuggestionDescription = `#${await thirdSuggestion.getAttribute("aria-describedby")}`;
  expect(page.locator(thirdSuggestionDescription)).toHaveText(
    "Show me the lottery factor for contributors in the remix-run/react-router project?"
  );

  const fourthSuggestion = await page.getByRole("button", { name: "Find experts", exact: true });
  expect(fourthSuggestion).toBeVisible();

  const fourthSuggestionDescription = `#${await fourthSuggestion.getAttribute("aria-describedby")}`;
  expect(page.locator(fourthSuggestionDescription)).toHaveText(
    "Who are the best developers that know Tailwind and are interested in Rust?"
  );

  const submitButton = await page.getByRole("button", { name: "Submit your question to StarSearch", exact: true });
  expect(submitButton).toBeVisible();

  const promptInput = await page.getByRole("textbox", { name: "Ask a question", exact: true });
  expect(promptInput).toBeVisible();

  // ensures the login dialog appears if the user is not logged in and they
  // click a suggested prompt
  const loginDialog = await page.getByRole("dialog", { name: "Login to try StarSearch", exact: true });
  expect(loginDialog).toBeHidden();

  firstSuggestsion.click();

  await expect(loginDialog).toBeVisible();

  // Close the dialog that's currently open
  await page.keyboard.press("Escape");

  // ensures the login dialog appears if the user is not logged in and they
  // click the ask a question text input
  await expect(loginDialog).toBeHidden();

  promptInput.click();

  await expect(loginDialog).toBeVisible();

  // Ensure there is a login via GitHub button in the dialog.
  expect(loginDialog.getByRole("button", { name: "Connect with GitHub", exact: true })).toBeVisible();
});

test("StarSearch OG image should exist", async ({ page }) => {
  await page.goto("/star-search");

  const expectedUrl = `${config.use?.baseURL}/og-images/star-search/?`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("StarSearch shared prompt (Logged Out Flow)", async ({ page }) => {
  await page.route(/\/v2\/star-search\/stream/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      path: "./e2e/fixtures/star-search/stream.txt",
    });
  });

  await page.goto("/star-search/?prompt=Who+are+the+most+prevalent+contributors+to+the+TypeScript+ecosystem%3F");

  expect(await page.getByRole("list", { name: "suggested prompts" })).not.toBeVisible();
  // expect(await page.getByRole("heading", { name: "StarSearch" })).not.toBeVisible();
  expect(await page.getByRole("heading", { name: "Copilot, but for git history" })).not.toBeVisible();
  expect(await page.getByRole("dialog", { name: "Login to try StarSearch", exact: true })).toBeHidden();

  const promptInput = await page.getByRole("textbox", { name: "Ask a question", exact: true });
  expect(promptInput).toBeVisible();
  // expect(promptInput).toBeDisabled();

  // get an element with role feed and name "StarSearch conversation" and check that it exists.
  const feed = await page.getByRole("feed", { name: "StarSearch conversation" });
  // expect(feed).toBeVisible();
  // expect(feed).toHaveAttribute("aria-busy", "true");

  const firstArticle = await feed.locator("article").first();
  expect(await firstArticle.getByRole("heading", { name: "You" })).toBeVisible();
  expect(await firstArticle.getByLabel("chat message")).toHaveText(
    "Who are the most prevalent contributors to the TypeScript ecosystem?"
  );

  // expect(await feed.getByRole("progressbar", { name: "Loading..." })).toBeVisible();

  expect(await feed.getByRole("progressbar", { name: "Loading..." })).not.toBeVisible();

  const secondArticle = await feed.locator("article").nth(1);
  expect(await secondArticle.getByRole("heading", { name: "StarSearch" })).toBeVisible();
  expect(await secondArticle.getByLabel("chat message")).toHaveText(starSearchResponse);

  expect(await page.getByRole("button", { name: "Clear chat history", exact: true })).toBeVisible();
  expect(await page.getByRole("button", { name: "Thumbs up", exact: true })).toBeVisible();
  expect(await page.getByRole("button", { name: "Thumbs down", exact: true })).toBeVisible();
  const sharePopupMenuTrigger = await page.getByRole("button", { name: "Share prompt options", exact: true });
  expect(sharePopupMenuTrigger).toBeVisible();
  expect(sharePopupMenuTrigger).toHaveAttribute("aria-haspopup", "menu");

  // open share prompt options menu
  await sharePopupMenuTrigger.click();

  expect(await page.getByRole("menuitem", { name: "Share to Twitter/X", exact: true })).toBeVisible();
  expect(await page.getByRole("menuitem", { name: "Share to LinkedIn", exact: true })).toBeVisible();
  expect(await page.getByRole("menuitem", { name: "Copy link", exact: true })).toBeVisible();

  // close share prompt options menu
  await sharePopupMenuTrigger.click();
  expect(sharePopupMenuTrigger).not.toHaveAttribute("aria-expanded");
  expect(await page.getByRole("menuitem", { name: "Share to Twitter/X", exact: true })).not.toBeVisible();
  expect(await page.getByRole("menuitem", { name: "Share to LinkedIn", exact: true })).not.toBeVisible();
  expect(await page.getByRole("menuitem", { name: "Copy link", exact: true })).not.toBeVisible();

  // check for OG image
  const expectedUrl = `${config.use?.baseURL}/og-images/star-search/?prompt=Who+are+the+most+prevalent+contributors+to+the+TypeScript+ecosystem%3F`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  // after the shared prompt runs for a logged out user, if they try to add their own prompt, it will be gated by a login dialog.
  promptInput.click();
  expect(await page.getByRole("dialog", { name: "Login to try StarSearch", exact: true })).toBeVisible();
});
