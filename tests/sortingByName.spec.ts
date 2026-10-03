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
  test( `Should sort products by ${name}`,{ tag: "@regression" }, async ({ allPages, page }) => {
      await test.step("Open homepage", async () => {
        await page.goto("/");
      });

      await test.step(`Sort products by ${name}`, async () => {
        await allPages.homePage.sortProduct(name);
      });

      await test.step("Verify products are sorted correctly", async () => {
        const productNames = await allPages.homePage.getProductNames();
        const sortedNames = [...productNames].sort();

        if (direction === "desc") {
          sortedNames.reverse();
        }

        expect(productNames).toEqual(sortedNames);
      });
    },
  );
});
