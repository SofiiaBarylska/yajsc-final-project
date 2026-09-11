import { expect } from "@playwright/test";
import { test } from "../fixtures";

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
  test(`Should sort products by ${name}`, async ({ allPages, page }) => {

    await page.goto("/");
    await allPages.homePage.sortProduct(name);

    const productNames = await allPages.homePage.getProductNames();
    const sortedNames = [...productNames].sort();
    if (direction === "desc") {
      sortedNames.reverse();
    }

    expect(productNames).toEqual(sortedNames);
  });
});
