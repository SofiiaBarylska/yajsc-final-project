import { Locator, Page } from "@playwright/test";
import { HeaderFragments } from "./fragments/headerFragments";

export class HomePage {
  page: Page;
  header: HeaderFragments;
  productName: Locator;
    sortDropdown: Locator;
    productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragments(page);

    this.productName = this.page.getByTestId("product-name");
      this.sortDropdown = this.page.getByTestId("sort");
      this.productPrice = this.page.getByTestId("product-price");
  }

  async selectProduct(productName: string): Promise<void> {
    await this.productName.filter({ hasText: productName }).click();
  }

  async sortProduct(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: sortOption });
    await this.page.waitForTimeout(500);
  }

  async getProductNames(): Promise<string[]> {
    const productNames = await this.productName.allTextContents();
    await this.page.waitForTimeout(500);

    return productNames.map((name) => name.trim());
  }

  async getProductPrices(): Promise<number[]> {
      const prices = await this.productPrice.allTextContents();
      
      return prices.map((price) => {
          return Number(price.replace("$", "").trim());
      })
    }
      async selectCategory(category: string): Promise < void> {
          await this.page.getByText(category, { exact: true }).click();

          await this.productName.filter({ hasText: category }).first().waitFor();
      };
}