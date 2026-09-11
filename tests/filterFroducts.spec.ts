import { expect } from "@playwright/test";
import { PowerTools } from "../pages/enums/productCategories";
import { test } from "../fixtures";

test("Check user can filter products by category", async ({ allPages, page }) => {

  await page.goto("/");
  await allPages.homePage.selectCategory(PowerTools.SANDER);
  const productNames = await allPages.homePage.getProductNames();

  for (const productName of productNames) {
    expect(productName).toContain(PowerTools.SANDER);
  }
});
