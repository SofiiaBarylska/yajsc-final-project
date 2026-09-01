import { Locator, Page } from "@playwright/test";

export class HeaderFragments {
  page: Page;
  navMenu: Locator;
  cartQuantity: Locator;
  cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.getByTestId("nav-menu");
    this.cartQuantity = page.getByTestId("cart-quantity");
    this.cart = page.getByTestId("nav-cart");
  }
}
