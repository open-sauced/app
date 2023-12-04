import playwright from "playwright";

export const handler = async (event, context) => {
  let browser;
  try {
    browser = await playwright.chromium.launch();
    const page = await browser.newPage();

    // Obtain authentication credentials (cookies and JWT tokens) here.
    // const cookies = [{ name: "cookie_name", value: "cookie_value" }];
    // const jwtToken = "your_jwt_token";

    // Navigate to the authenticated page.
    await page.goto("http://localhost:3000/lists/23c2ca69-7667-4b6a-ad2e-d402999af310/activity");

    // Set cookies and JWT token in the page context.
    // await page.setCookie(...cookies);
    // await page.evaluate((token) => {
    //   localStorage.setItem("jwtToken", token);
    // }, jwtToken);

    // Wait for any necessary elements or conditions.
    const graphHandle = await page.waitForSelector('article:has([data-ready="true"])')

    await page.waitForFunction(() => {
      const images = Array.from(document.querySelectorAll('article:has([data-ready="true"]) img'));
      return images.every(img => img.complete);
    });

    // Capture a screenshot of the authenticated page.
    const screenshot = await graphHandle.screenshot();

    // Close the browser.
    await browser.close();

    // Set the HTTP response headers for an image.
    const responseHeaders = {
      "Content-Type": "image/png", // Set the appropriate image content type.
    };

    // Return the screenshot as the response body.
    return {
      statusCode: 200,
      body: screenshot.toString("base64"),
      headers: { "Content-Type": "image/png" },
      isBase64Encoded: true, // Specify that the body is base64-encoded.
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { "Content-Type": "application/json" },
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
