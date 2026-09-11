import { Locator, Page } from "@playwright/test";
import { HeaderFragments } from "./fragments/headerFragments";

export class AccountPage {
  page: Page;
  headerFragment: HeaderFragments;
  pageTitle: Locator;
  navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragments(page);
    this.pageTitle = page.getByRole("heading", { name: "My account" });
    this.navMenu = page.getByTestId("nav-menu");
  }
}
