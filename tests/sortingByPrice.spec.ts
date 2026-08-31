import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";


const sortOptions = [
  {
    name: "Price (High - Low)",
    direction: "desc",
  },
  {
    name: "Price (Low - High)",
    direction: "asc",
  },
];

sortOptions.forEach(({ name, direction }) => {
    test(`Should sort products by ${name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto("/");
        await homePage.sortProduct(name);

        const productPrices = await homePage.getProductPrices();
        const sortedPrices = [...productPrices];
        if (direction === "asc") {
            sortedPrices.sort((a, b) => a - b);
        } else {
            sortedPrices.sort((a, b) => b - a);
        }
        expect(productPrices).toEqual(sortedPrices);

    });
})