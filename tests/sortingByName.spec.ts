import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

const sortOptions = [
  {
    name: "Name (A - Z)",
    direction: "asc",
  },
  {
    name: "Name (Z - A)",
    direction: "desc",
  },
];

sortOptions.forEach(({ name, direction }) => {
  test(`Should sort products by ${name}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto("/");
    await homePage.sortProduct(name);

    const productNames = await homePage.getProductNames();
    const sortedNames = [...productNames].sort();
    if (direction === "desc") {
      sortedNames.reverse();
    }

    expect(productNames).toEqual(sortedNames);
  });
});
