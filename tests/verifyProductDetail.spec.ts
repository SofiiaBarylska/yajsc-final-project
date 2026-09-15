import { expect } from "@playwright/test";
import { test } from "../fixtures";

test("Verify user can view product details", async ({ allPages }) => {
  await allPages.page.goto("/");

  await allPages.homePage.selectProduct("Combination Pliers");
  await expect(allPages.page).toHaveURL(/\/product/);
  await expect(allPages.productPage.productName).toHaveText(
    "Combination Pliers",
  );
  await expect(allPages.productPage.productPrice).toContainText("14.15");
  await expect(allPages.productPage.addToCart).toBeVisible();
  await expect(allPages.productPage.favouriteButton).toBeVisible();
});

test("Add product to cart", async ({allPages }) => {

  await allPages.page.goto("/");
  await allPages.homePage.selectProduct("Slip Joint Pliers");
  await expect(allPages.productPage.productName).toHaveText("Slip Joint Pliers");
  await expect(allPages.productPage.productPrice).toContainText("9.17");
  await allPages.productPage.addToCart.click();
  await expect(allPages.productPage.alert).toBeVisible();
  const alertText = await allPages.productPage.alert.textContent();
  expect(alertText?.trim()).toBe("Product added to shopping cart.");
  await expect(allPages.productPage.alert).toBeHidden({ timeout: 8000 });
  await expect(allPages.productPage.header.cartQuantity).toHaveText("1");
  await allPages.productPage.header.cart.click();
  await expect(allPages.page).toHaveURL(/\/checkout/);
  await expect(allPages.cartPage.productQuantity).toHaveValue("1");
  await expect(allPages.cartPage.productTitle).toHaveText("Slip Joint Pliers");
  await expect(allPages.cartPage.checkoutButton).toBeVisible();
});
