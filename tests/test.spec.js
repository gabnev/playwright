const { test, expect } = require("@playwright/test");
const { login, loginInvalid, logout } = require("./utils/login");
const testData = require("./data/testData.json");

test.describe("Unauthenticated tests", () => {
  test("invalid login", async ({ browser }) => {
    const tempContext = await browser.newContext(); // Temporary context
    const tempPage = await tempContext.newPage();
    await loginInvalid(tempPage, testData.invalidLogin); // Test invalid login
    await expect(tempPage.locator("#notistack-snackbar")).toHaveText(
      testData.loginErrorMessage
    ); // Verify error message
    await tempContext.close(); // Cleanup only the temporary context
  });
});

test.describe("login", () => {
  let context;
  let page;
  let loggedIn = false; // Add a flag to track login state

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await login(page);
    loggedIn = true; // Set the flag
  });

  test.afterEach(async () => {
    if (context) {
      if (loggedIn) {
        await logout(page); // Perform logout only if logged in
        loggedIn = false;
      }
      await context.close(); // Clean up only if context is not null
      context = null; // Reset context to avoid reuse
    }
  });

  test("Create a new business", async () => {
    console.log("Login test passed successfully");
  });
});
