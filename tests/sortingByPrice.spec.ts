import { expect } from "@playwright/test";
import { test } from '../fixtures';

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
  test(`Should sort products by ${name}`, async ({ allPages, page }) => {

    await page.goto("/");
    await allPages.homePage.sortProduct(name);

    const productPrices = await allPages.homePage.getProductPrices();
    const sortedPrices = [...productPrices];
    if (direction === "asc") {
      sortedPrices.sort((a, b) => a - b);
    } else {
      sortedPrices.sort((a, b) => b - a);
    }
    expect(productPrices).toEqual(sortedPrices);
  });
});
