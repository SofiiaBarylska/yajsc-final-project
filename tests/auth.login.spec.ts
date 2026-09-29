import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { customer } from "../test-data/users";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test("login to the site", { tag: "@smoke" }, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step("Open login page", async () => {
    await page.goto("/auth/login");
  });

  await test.step("Login with valid credentials", async () => {
    await loginPage.login(customer.email, customer.password);
  });

  await test.step("Verify successful login and save authentication state", async () => {
    await expect(page).toHaveURL("/account");
    await page.context().storageState({ path: authFile });
  });
});
