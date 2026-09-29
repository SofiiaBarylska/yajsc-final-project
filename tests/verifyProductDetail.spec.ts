import { expect } from "@playwright/test";
import { test } from "../fixtures";

test(
  "Verify user can view product details",
  { tag: "@smoke" },
  async ({ allPages }) => {
    await test.step("Open homepage and select product", async () => {
      await allPages.page.goto("/");
      await allPages.homePage.selectProduct("Combination Pliers");
    });

    await test.step("Verify product details", async () => {
      await expect(allPages.page).toHaveURL(/product/);
      await expect(allPages.productPage.productName).toHaveText(
        "Combination Pliers",
      );
      await expect(allPages.productPage.productPrice).toContainText("14.15");
    });

    await test.step("Verify product actions are available", async () => {
      await expect(allPages.productPage.addToCart).toBeVisible();
      await expect(allPages.productPage.favouriteButton).toBeVisible();
    });
  },
);

test("Add product to cart", { tag: "@smoke" }, async ({ allPages }) => {
  await test.step("Open homepage and select product", async () => {
    await allPages.page.goto("/");
    await allPages.homePage.selectProduct("Slip Joint Pliers");
  });

  await test.step("Verify product details", async () => {
    await expect(allPages.productPage.productName).toHaveText(
      "Slip Joint Pliers",
    );
    await expect(allPages.productPage.productPrice).toContainText("9.17");
  });

  await test.step("Add product to cart", async () => {
    await allPages.productPage.addToCart.click();
  });

  await test.step("Verify product was added successfully", async () => {
    await expect(allPages.productPage.alert).toBeVisible();
    const alertText = await allPages.productPage.alert.textContent();
    expect(alertText?.trim()).toBe("Product added to shopping cart.");
    await expect(allPages.productPage.alert).toBeHidden({ timeout: 8000 });
    await expect(allPages.productPage.header.cartQuantity).toHaveText("1");
  });

  await test.step("Open cart and verify product", async () => {
    await allPages.productPage.header.cart.click();
    await expect(allPages.page).toHaveURL(/\/checkout/);
    await expect(allPages.cartPage.productQuantity).toHaveValue("1");
    await expect(allPages.cartPage.productTitle).toHaveText(
      "Slip Joint Pliers",
    );
    await expect(allPages.cartPage.checkoutButton).toBeVisible();
  });
});
