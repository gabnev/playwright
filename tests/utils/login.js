const { test, expect } = require("@playwright/test"); // import playwright functions that you will use

const loginPage = "https://app.release.advertio.com/auth/login"; // create a variable with the URL of the page you want to test

const login = async (page) => {
  await page.goto(loginPage);

  if (!process.env.SIGN_IN || !process.env.PASSWORD) {
    throw new Error("Environment variables SIGN_IN and PASSWORD are required.");
  }

  await page
    .locator('[data-testid="auth.login.email"] input')
    .fill(process.env.SIGN_IN);
  await page
    .locator('[data-testid="auth.login.password"] input')
    .fill(process.env.PASSWORD);
  await page.locator('[data-testid="auth.login.submit"]').click();
  // Do not forget to add validations
};

const loginInvalid = async (page, { email, password }) => {
    await page.goto(loginPage);
    await page.locator('[data-testid="auth.login.email"] input').fill(email);
    await page.locator('[data-testid="auth.login.password"] input').fill(password);
    await page.locator('[data-testid="auth.login.submit"]').click();
  };

async function logout(page) {
  await page.locator("[data-testid='header-navigation-user-button']").click();
  await page.locator("[data-testid='menu-logout']").click();
}

module.exports = { login, loginInvalid, logout }; // export the function to use it in other files
