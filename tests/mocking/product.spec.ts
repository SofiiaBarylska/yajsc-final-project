import { test, expect } from "../../fixtures";

test("Verify that 20 products are displayed", { tag: "@regression" }, async ({ allPages }) => {
    await test.step("Mock products API response", async () => {
      await allPages.page.route(
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
    });

    await test.step("Open homepage", async () => {
      await allPages.page.goto("/");
    });

    await test.step("Verify that 20 products are displayed", async () => {
      await expect(allPages.productPage.productName).toHaveCount(20);
    });
  },
);
