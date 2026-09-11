import { test as base } from "@playwright/test";
import { AllPages } from "./pages/AllPages/allPages";
import { customer } from "./test-data/users";


type MyFixtures = {
  loggedInApp: AllPages;
  allPages: AllPages;
};

export const test = base.extend<MyFixtures>({
  loggedInApp: async ({ allPages }, use) => {
    await allPages.page.goto("/auth/login");
        await allPages.loginPage.login(customer.email, customer.password);
        console.log("URL after login:", allPages.page.url());
        console.log(
          "Sign in visible:",
          await allPages.page.getByText("Sign in", { exact: true }).isVisible(),
        );
        
    await use(allPages);
  },

  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);
    await use(allPages);
  },
});

export { expect } from '@playwright/test';