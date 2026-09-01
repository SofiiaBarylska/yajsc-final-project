import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { CartPage } from "../pages/cart.page";

test("Verify user can view product details", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  await page.goto("/");

  await homePage.selectProduct("Combination Pliers");
  await expect(page).toHaveURL(/\/product/);
  await expect(productPage.productName).toHaveText("Combination Pliers");
  await expect(productPage.productPrice).toContainText("14.15");
  await expect(productPage.addToCart).toBeVisible();
  await expect(productPage.favouriteButton).toBeVisible();
});

test("Add product to cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await page.goto("/");
  await homePage.selectProduct("Slip Joint Pliers");
  await expect(productPage.productName).toHaveText("Slip Joint Pliers");
  await expect(productPage.productPrice).toContainText("9.17");
  await productPage.addToCart.click();
  await expect(productPage.alert).toBeVisible();
  const alertText = await productPage.alert.textContent();
  expect(alertText?.trim()).toBe("Product added to shopping cart.");
  await expect(productPage.alert).toBeHidden({ timeout: 8000 });
  await expect(productPage.header.cartQuantity).toHaveText("1");
  await productPage.header.cart.click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(cartPage.productQuantity).toHaveValue("1");
  await expect(cartPage.productTitle).toHaveText("Slip Joint Pliers");
  await expect(cartPage.checkoutButton).toBeVisible();
});
