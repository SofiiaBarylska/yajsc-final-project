import { Locator, Page } from "@playwright/test";
import { HeaderFragments } from "./fragments/headerFragments";

export class HomePage {
    page: Page;
    header: HeaderFragments;
    product:Locator

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragments(page);

        this.product = this.page.getByTestId('product-name');

    }

    async selectProduct(productName: string): Promise<void> {
        await this.product.filter({ hasText: productName }).click();
}

}