import { expect } from "@playwright/test";
import { test } from "../fixtures";
import { card } from "../test-data/cards";

test(
  "Verify that user can create order successfull",
  { tag: "@regression" },
  async ({ loggedInApp }) => {
    await test.step("Open homepage and select product", async () => {
      await loggedInApp.page.goto("/");
    });

    const productName = await test.step("Get first product name", async () => {
      return await loggedInApp.homePage.getFirstProductName();
    });

    const productPrice =
      await test.step("Get first product price", async () => {
        return await loggedInApp.homePage.getFirstProductPrice();
      });

    await test.step("Add first product to cart", async () => {
      await loggedInApp.homePage.selectFirstProduct();
      await loggedInApp.productPage.addProductToCart();
    });

    await test.step("Open cart", async () => {
      await loggedInApp.productPage.header.goToCart();
    });

    const cartProductName =
      await test.step("Get product information from cart", async () => {
        return await loggedInApp.cartPage.getProductTitle();
      });

    const cartProductPrice = await loggedInApp.cartPage.getProductPrice();
    const totalPrice = await loggedInApp.cartPage.getTotalPrice();

    await test.step("Verify product information in cart", () => {
      expect(cartProductName).toBe(productName);
      expect(cartProductPrice).toBe(productPrice);
      expect(totalPrice).toBe(productPrice);
    });

    await test.step("Proceed to checkout", async () => {
      await loggedInApp.cartPage.goToCheckout();
    });

    await test.step("Verify that user is logged in", async () => {
      expect(await loggedInApp.checkoutPage.isUserLoggedIn()).toBe(true);
    });

    await test.step("Fill billing information", async () => {
      await loggedInApp.checkoutPage.goToBillingStep();
      await loggedInApp.checkoutPage.fillBillingAddress();
    });

    await test.step("Fill payment information", async () => {
      await loggedInApp.checkoutPage.goToPaymentStep();
      await loggedInApp.checkoutPage.choosePaymentMethod();
      await loggedInApp.checkoutPage.fillPaymentDetails(card);
    });

    await test.step("Confirm payment and verify successful order", async () => {
      await loggedInApp.checkoutPage.confirmPayment();
      await loggedInApp.checkoutPage.orderIsSuccessful();
    });
  },
);
