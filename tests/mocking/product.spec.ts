import { test, expect } from "@playwright/test";

test("Verify that 20 products are displayed", async ({ page }) => {
  await page.route(
    "https://api.practicesoftwaretesting.com/products*",
    async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      const products = json.data;

      json.data = Array.from(
        { length: 20 },
        (_, index) => products[index % products.length],
      );

      await route.fulfill({ response, json });
    },
  );

  await page.goto("https://practicesoftwaretesting.com/");
  await expect(page.getByTestId("product-name")).toHaveCount(20);
});
