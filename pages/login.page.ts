import { Locator, Page } from "@playwright/test";
import { HeaderFragments } from "./fragments/headerFragments";

export class LoginPage {
  page: Page;
  header: HeaderFragments;
  emailField: Locator;
  passwordField: Locator;
  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragments(page);
    this.emailField = this.page.getByTestId("email");
    this.passwordField = this.page.getByTestId("password");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.page.getByTestId("login-submit").click();
  }
}
