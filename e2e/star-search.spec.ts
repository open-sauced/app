import { test, expect } from "@playwright/test";

test("StarSearch (Logged Out Experience)", async ({ page }) => {
  await page.goto("/star-search");

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
});
