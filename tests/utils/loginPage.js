class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = "https://www.saucedemo.com/";
    this.emailInput = '#user-name';
    this.passwordInput = '#password';
    this.submitButton = '#login-button';
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async waitForLoad() {
    await this.page.waitForSelector(this.emailInput);
  }

  async login(email, password) {
    await this.waitForLoad();
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async logout() {
    await this.page.locator("#react-burger-menu-btn").click();
    await this.page.locator("#logout_sidebar_link").click();
  }
}

module.exports = LoginPage;
