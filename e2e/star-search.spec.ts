import { test, expect } from "@playwright/test";
import config from "../playwright.config";

const BASE_URL = config.use?.baseURL ?? "http://localhost:3000";

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

  const expectedUrl = `${BASE_URL}/og-images/star-search/?`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("StarSearch shared prompt (legacy) (Logged Out Flow)", async ({ page, browserName }) => {
  // This is to test support for legacy shared prompts. See https://github.com/open-sauced/app/pull/3324
  await page.goto(
    "/star-search?prompt=Show%20me%20the%20lottery%20factor%20for%20contributors%20in%20the%20remix-run%2Freact-router%20project"
  );

  await expect(page.getByRole("dialog", { name: "Login to try StarSearch", exact: true })).toBeVisible();
});

test("StarSearch shared conversation (Logged Out Flow)", async ({ page, browserName }) => {
  // Note: If this page fails to load at some point, the development database has been reset, and
  // new shared StarSearch conversations will need to be created.
  await page.goto("/star-search?share_id=900686cc-8926-47fd-a1d6-0e19da967f48");

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

  // This is commented out for now because I haven't figured out a way yet to get the mocked stream response to slow down a bit.
  // await expect(feed).toHaveAttribute("aria-busy", "true");

  const firstArticle = feed.locator("article").first();
  await expect(firstArticle.getByRole("heading", { name: "StarSearch" })).toBeVisible();
  await expect(firstArticle.getByLabel("chat message")).toHaveText(
    "What type of pull requests has @brandonroberts worked on?"
  );

  // This is commented out for now because I haven't figured out a way yet to get the mocked stream response to slow down a bit.
  // await expect(feed.getByRole("progressbar", { name: "Loading..." })).toBeVisible();

  await expect(feed.getByRole("progressbar", { name: "Loading..." })).not.toBeVisible();
  const secondArticle = feed.locator("article").nth(1);
  await expect(secondArticle.getByRole("heading", { name: "StarSearch" })).toBeVisible();
  await expect(secondArticle.getByLabel("chat message"))
    .toHaveText(`Here are some recent pull requests that @brandonroberts has worked on:
Repository: analogjs/analog


fix(create-analog): add fixes for v18 template

Type: Bugfix
Details: Fixed issues with the v18 template in create-analog package to ensure consistent behavior.
Additions/Deletions: +2/-0 across 2 files.



chore: release 1.5.0

Type: Release
Details: Prepared and executed the release of version 1.5.0 of the analog library. Included merged pull requests, updated documentation, and version bump.
Additions/Deletions: +2114/-3117 across 101 files.



feat: update deps and apps to Angular v18 release

Type: Feature
Details: Updated dependencies and applications in the analog repository to use Angular v18 release.
Additions/Deletions: +1642/-2035 across 24 files.



chore: release 1.4.0

Type: Release
Details: Prepared for the new release 1.4.0, including several dependency upgrades, bug fixes, and version updates.
Additions/Deletions: +3906/-2445 across 119 files.



fix(content): add migration for marked-mangle dependency

Type: Bugfix
Details: Added migration for marked-mangle dependency during latest version upgrades.
Additions/Deletions: +20/-1 across 3 files.

`);

  await expect(page.getByRole("button", { name: "Clear chat history", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Thumbs up", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Thumbs down", exact: true })).toBeVisible();

  const sharePopupMenuTrigger = page.getByRole("button", { name: "Share prompt options", exact: true });
  await expect(sharePopupMenuTrigger).toBeVisible();
  await expect(sharePopupMenuTrigger).toHaveAttribute("aria-haspopup", "menu");

  // open share prompt options menu
  await sharePopupMenuTrigger.click();

  const shareToTwitterMenuItem = page.getByRole("menuitem", { name: "Share to Twitter/X", exact: true });
  const shareToLinkedInMenuItem = page.getByRole("menuitem", { name: "Share to LinkedIn", exact: true });
  const copyLinkMenuItem = page.getByRole("menuitem", { name: "Copy link", exact: true });

  await expect(shareToTwitterMenuItem).toBeVisible();
  await expect(shareToTwitterMenuItem.locator("a")).toHaveAttribute(
    "href",
    "https://twitter.com/intent/tweet?text=Here%27s+my+StarSearch+prompt%21%0A%0ATry+it+out+for+yourself.+%23StarSearch&url=https%3A%2F%2Fdub.sh%2FCsj383d"
  );

  await expect(shareToLinkedInMenuItem).toBeVisible();
  await expect(shareToLinkedInMenuItem.locator("a")).toHaveAttribute(
    "href",
    "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdub.sh%2FCsj383d"
  );
  await expect(copyLinkMenuItem).toBeVisible();

  if (["webkit", "Desktop Safari", "Mobile Safari"].includes(browserName)) {
    // Webkit does not support clipboard API access in Playwright at the moment.
    await sharePopupMenuTrigger.click();
  } else {
    // Ensure link was copied correctly
    await copyLinkMenuItem.click();
    await expect(await page.evaluate("navigator.clipboard.readText()")).toEqual("https://dub.sh/Csj383d");
  }

  await expect(sharePopupMenuTrigger).not.toHaveAttribute("aria-expanded");
  await expect(shareToTwitterMenuItem).not.toBeVisible();
  await expect(shareToLinkedInMenuItem).not.toBeVisible();
  await expect(copyLinkMenuItem).not.toBeVisible();

  // check for shared prompt OG image
  const expectedUrl = `${BASE_URL}/og-images/star-search/?share_id=900686cc-8926-47fd-a1d6-0e19da967f48`;

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedUrl);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  const askAQuestionInput = page.getByRole("textbox", { name: "Ask a question", exact: true });
  await expect(askAQuestionInput).toBeDisabled();
  const newConversationButton = page.getByRole("button", { name: "Start a Conversation", exact: true });
  await expect(newConversationButton).toBeVisible();

  await newConversationButton.click();
  await expect(page.getByRole("list", { name: "suggested prompts" })).toBeVisible();
  await expect(askAQuestionInput).toBeEnabled();

  await askAQuestionInput.click();
  await expect(page.getByRole("dialog", { name: "Login to try StarSearch", exact: true })).toBeVisible();
});
