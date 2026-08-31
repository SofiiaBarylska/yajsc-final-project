import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { PowerTools } from "../pages/enums/productCategories";


test("Check user can filter products by category", async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto("/");
    await homePage.selectCategory(PowerTools.SANDER);
    const productNames = await homePage.getProductNames();

    for (const productName of productNames) {
        expect(productName).toContain("Sander");
    }
});