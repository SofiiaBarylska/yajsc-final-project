import { expect } from "@playwright/test";
import { PowerTools } from "../pages/enums/productCategories";
import { test } from "../fixtures";

test(
  "Check user can filter products by category", { tag: "@regression" }, async ({ allPages, page }) => {
    await test.step("Open homepage", async () => {
      await page.goto("/");
    });

    await test.step("Filter products by Sander category", async () => {
      await allPages.homePage.selectCategory(PowerTools.SANDER);
    });

    await test.step("Verify all displayed products belong to selected category", async () => {
      const productNames = await allPages.homePage.getProductNames();

      for (const productName of productNames) {
        expect(productName).toContain(PowerTools.SANDER);
      }
    });
  },
);
