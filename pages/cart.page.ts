import { Locator, Page } from "@playwright/test";


export class CartPage {
  page: Page;
  productTitle: Locator;
  productQuantity: Locator;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = this.page.getByTestId("product-title");
    this.productQuantity = this.page.getByTestId("product-quantity");
    this.checkoutButton = this.page.getByTestId("proceed-1");
  }

};