import { test, expect } from "@playwright/test";
import config from "../playwright.config";
import { starSearchResponse } from "./fixtures/star-search/streamResponse";

test("StarSearch (Logged Out Flow)", async ({ page }) => {
  await page.goto("/star-search");

  await expect(page.getByRole("list", { name: "suggested prompts" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "StarSearch" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Copilot, but for git history" })).toBeVisible();

  // Ensure all suggestions are present
  const firstSuggestsion = page.getByRole("button", {
    name: "Get information on contributor activity",
    exact: true,
  });
  await expect(firstSuggestsion).toBeVisible();

  const firstSuggestsionSelector = `#${await firstSuggestsion.getAttribute("aria-describedby")}`;
  await expect(page.locator(firstSuggestsionSelector)).toHaveText(
    "What type of pull requests has @brandonroberts worked on?"
  );

  const secondSuggestion = page.getByRole("button", { name: "Identify key contributors", exact: true });
  await expect(secondSuggestion).toBeVisible();

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
  await expect(page.locator(thirdSuggestionDescription)).toHaveText(
    "Show me the lottery factor for contributors in the remix-run/react-router project?"
  );

  const fourthSuggestion = page.getByRole("button", { name: "Find experts", exact: true });
  await expect(fourthSuggestion).toBeVisible();

  const fourthSuggestionDescription = `#${await fourthSuggestion.getAttribute("aria-describedby")}`;
  await expect(page.locator(fourthSuggestionDescription)).toHaveText(
    "Who are the best developers that know Tailwind and are interested in Rust?"
  );

  const submitButton = page.getByRole("button", { name: "Submit your question to StarSearch", exact: true });
  await expect(submitButton).toBeVisible();

  const promptInput = page.getByRole("textbox", { name: "Ask a question", exact: true });
  await expect(promptInput).toBeVisible();

  // ensures the login dialog appears if the user is not logged in and they
  // click a suggested prompt
  let loginDialog = page.getByRole("dialog", { name: "Login to try StarSearch", exact: true });
  await expect(page.getByRole("dialog", { name: "Login to try StarSearch", exact: true })).toBeHidden();

  await firstSuggestsion.click();

  await expect(loginDialog).toBeVisible();

  // Close the dialog that's currently open
  await page.keyboard.press("Escape");

  // ensures the login dialog appears if the user is not logged in and they
  // click the ask a question text input
  await expect(loginDialog).toBeHidden();

  await promptInput.click();

  await expect(loginDialog).toBeVisible();
  await expect(loginDialog.getByRole("button", { name: "Connect with GitHub", exact: true })).toBeVisible();
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

  await expect(page.getByRole("list", { name: "suggested prompts" })).not.toBeVisible();
  // await expect(page.getByRole("heading", { name: "StarSearch" })).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Copilot, but for git history" })).not.toBeVisible();
  await expect(page.getByRole("dialog", { name: "Login to try StarSearch", exact: true })).toBeHidden();

  const promptInput = page.getByRole("textbox", { name: "Ask a question", exact: true });
  await expect(promptInput).toBeVisible();
  // await expect(promptInput).toBeDisabled();

  // get an element with role feed and name "StarSearch conversation" and check that it exists.
  const feed = page.getByRole("feed", { name: "StarSearch conversation" });
  await expect(feed).toBeVisible();
  // await expect(feed).toHaveAttribute("aria-busy", "true");

  const firstArticle = feed.locator("article").first();
  await expect(firstArticle.getByRole("heading", { name: "You" })).toBeVisible();
  await expect(firstArticle.getByLabel("chat message")).toHaveText(
    "Who are the most prevalent contributors to the TypeScript ecosystem?"
  );

  // await expect(feed.getByRole("progressbar", { name: "Loading..." })).toBeVisible();

  await expect(feed.getByRole("progressbar", { name: "Loading..." })).not.toBeVisible();

  const secondArticle = feed.locator("article").nth(1);
  await expect(secondArticle.getByRole("heading", { name: "StarSearch" })).toBeVisible();
  await expect(secondArticle.getByLabel("chat message")).toHaveText(starSearchResponse);

  await expect(page.getByRole("button", { name: "Clear chat history", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Thumbs up", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Thumbs down", exact: true })).toBeVisible();

  const sharePopupMenuTrigger = page.getByRole("button", { name: "Share prompt options", exact: true });
  await expect(sharePopupMenuTrigger).toBeVisible();
  await expect(sharePopupMenuTrigger).toHaveAttribute("aria-haspopup", "menu");

  // open share prompt options menu
  await sharePopupMenuTrigger.click();

  await expect(page.getByRole("menuitem", { name: "Share to Twitter/X", exact: true })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Share to LinkedIn", exact: true })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Copy link", exact: true })).toBeVisible();

  // close share prompt options menu
  await sharePopupMenuTrigger.click();
  await expect(sharePopupMenuTrigger).not.toHaveAttribute("aria-expanded");
  await expect(page.getByRole("menuitem", { name: "Share to Twitter/X", exact: true })).not.toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Share to LinkedIn", exact: true })).not.toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Copy link", exact: true })).not.toBeVisible();

  // check for OG image
  const expectedUrl = `${config.use?.baseURL}/og-images/star-search/?prompt=Who+are+the+most+prevalent+contributors+to+the+TypeScript+ecosystem%3F`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  // // after the shared prompt runs for a logged out user, if they try to add their own prompt, it will be gated by a login dialog.
  await page.getByRole("textbox", { name: "Ask a question", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Login to try StarSearch", exact: true })).toBeVisible();
});
