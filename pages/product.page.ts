import { Locator, Page } from "@playwright/test";


export class ProductPage {
  page: Page;
    addToCart: Locator;
    favouriteButton: Locator;
    productName: Locator;
    productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
      this.addToCart = this.page.getByTestId("add-to-cart");
      this.favouriteButton = this.page.getByTestId("add-to-favorites");
      this.productName = this.page.getByTestId("product-name");
      this.productPrice = this.page.getByTestId("unit-price");
    };

   
}