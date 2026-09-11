import { Locator, Page } from "@playwright/test";
import { HeaderFragments } from "./fragments/headerFragments";

export class ProductPage {
  page: Page;
  header: HeaderFragments;
  addToCart: Locator;
  favouriteButton: Locator;
  productName: Locator;
  productPrice: Locator;
  alert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragments(page);
    this.addToCart = this.page.getByTestId("add-to-cart");
    this.favouriteButton = this.page.getByTestId("add-to-favorites");
    this.productName = this.page.getByTestId("product-name");
    this.productPrice = this.page.getByTestId("unit-price");
    this.alert = page.getByRole("alert");
  }

  async addProductToCart(): Promise<void> {
    await this.addToCart.click();
    await this.alert.waitFor();
  }
}
