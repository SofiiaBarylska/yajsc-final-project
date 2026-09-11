import { Locator, Page } from "@playwright/test";


export class CartPage {
  page: Page;
  productTitle: Locator;
  productQuantity: Locator;
  checkoutButton: Locator;
  productPrice: Locator;
  totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = this.page.getByTestId("product-title");
    this.productQuantity = this.page.getByTestId("product-quantity");
    this.productPrice = this.page.getByTestId("product-price");
    this.totalPrice = this.page.getByTestId("line-price");
    this.checkoutButton = this.page.getByTestId("proceed-1");
  }
  async getProductTitle(): Promise<string> {
    return (await this.productTitle.innerText()).trim();
  }

  async getProductPrice(): Promise<number> {
    return Number(
      (await this.productPrice.innerText()).replace("$", "").trim(),
    );
  }

  async getTotalPrice(): Promise<number> {
    return Number((await this.totalPrice.innerText()).replace("$", "").trim());
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
};