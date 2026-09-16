import { test as base } from "@playwright/test";
import { AllPages } from "./pages/AllPages/allPages";
import { customer } from "./test-data/users";

type MyFixtures = {
  loggedInApp: AllPages;
  allPages: AllPages;
};

export const test = base.extend<MyFixtures>({
  loggedInApp: async ({ request, allPages }, use) => {
    const resp = await request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email: customer.email,
          password: customer.password,
        },
      },
    );
    const jsonData = await resp.json();
    let token = jsonData.access_token;

    await allPages.page.goto("/");

    await allPages.page.evaluate((token) => {
      localStorage.setItem("auth-token", token);
    }, token);
    await allPages.page.reload();
    await use(allPages);
  },

  //  loggedInApp: async ({ allPages }, use) => {
  //   await allPages.page.goto("/auth/login");
  //       await allPages.loginPage.login(customer.email, customer.password);
  //       console.log("URL after login:", allPages.page.url());
  //       console.log(
  //         "Sign in visible:",
  //         await allPages.page.getByText("Sign in", { exact: true }).isVisible(),
  //       );

  //   await use(allPages);
  // },

  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);
    await use(allPages);
  },
});

export { expect } from "@playwright/test";
