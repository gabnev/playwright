
const { test, expect } = require("@playwright/test");
const LoginPage = require("./utils/loginPage");
const CartActions = require("./utils/cartActions");
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
  let cartActions;
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

  // test("Add all items to cart", async () => {
  //   cartActions = new CartActions(page); // Create a new instance of the cart actions
  //   await cartActions.addAllItemsToCart(); // Add all items to the cart
  // });

  test("Add specific items to cart", async () => {
    cartActions = new CartActions(page); // Create a new instance of the cart actions
    await cartActions.addSpecificItemToCart("backpack"); // Add specific items to the cart
  });
});
