import { expect } from "@playwright/test";
import { test } from "../fixtures";

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
  test( `Should sort products by ${name}`, { tag: "@regression" }, async ({ allPages, page }) => {
      await test.step("Open homepage", async () => {
        await page.goto("/");
      });

      await test.step(`Sort products by ${name}`, async () => {
        await allPages.homePage.sortProduct(name);
      });

      await test.step("Verify products are sorted correctly", async () => {
        const productPrices = await allPages.homePage.getProductPrices();
        const sortedPrices = [...productPrices];

        if (direction === "asc") {
          sortedPrices.sort((a, b) => a - b);
        } else {
          sortedPrices.sort((a, b) => b - a);
        }

        expect(productPrices).toEqual(sortedPrices);
      });
    },
  );
});
