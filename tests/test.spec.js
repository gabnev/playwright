
const { test, expect } = require("@playwright/test");
const LoginPage = require("./utils/loginPage");
const testData = require("./data/testData.json");

test.describe("Unauthenticated tests", () => {
  test("invalid login", async ({ browser }) => {
    const tempContext = await browser.newContext(); // Temporary context
    const tempPage = await tempContext.newPage();

    const loginPage = new LoginPage(tempPage); // Create a new instance of the login page
    await loginPage.navigate(); // Navigate to the login page
    await loginPage.login("test", "test"); // Perform login

    await tempContext.close(); // Cleanup only the temporary context
  });
});

test.describe("login", () => {
  let context;
  let page;
  let loginPage;
  let loggedIn = false; // Add a flag to track login state

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page); // Create a new instance of the login page
    await loginPage.navigate(); // Navigate to the login page
    await loginPage.login(process.env.SIGN_IN, process.env.PASSWORD); // Perform login
    loggedIn = true; // Set the flag
  });

  test.afterEach(async () => {
    if (context) {
      if (loggedIn) {
        await loginPage.logout(); // Perform logout only if logged in
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
