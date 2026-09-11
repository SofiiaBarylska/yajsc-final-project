import { expect } from "@playwright/test";
import { test } from "../fixtures";


test("Verify that user can create order successfull", async ({ loggedInApp }) => {
    await loggedInApp.page.goto("/");
    
    const productName = await loggedInApp.homePage.getFirstProductName();
    const productPrice = await loggedInApp.homePage.getFirstProductPrice();
    await loggedInApp.homePage.selectFirstProduct();
    await loggedInApp.productPage.addProductToCart();
    await loggedInApp.productPage.header.goToCart();
    const cartProductName = await loggedInApp.cartPage.getProductTitle();
    const cartProductPrice = await loggedInApp.cartPage.getProductPrice();
    const totalPrice = await loggedInApp.cartPage.getTotalPrice();

    expect(cartProductName).toBe(productName);
    expect(cartProductPrice).toBe(productPrice);
    expect(totalPrice).toBe(productPrice);
    await loggedInApp.cartPage.goToCheckout();
    expect(await loggedInApp.checkoutPage.isUserLoggedIn()).toBe(true);
    await loggedInApp.checkoutPage.goToBillingStep();
    await loggedInApp.checkoutPage.fillBillingAddress();
    await loggedInApp.checkoutPage.goToPaymentStep();
    await loggedInApp.checkoutPage.choosePaymentMethod();
    await loggedInApp.checkoutPage.fillPaymentDetails();
    await loggedInApp.checkoutPage.confirmPayment();
    await loggedInApp.checkoutPage.orderIsSuccessful();


});
