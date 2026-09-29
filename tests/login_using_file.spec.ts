import { test, expect } from "@playwright/test";
import { AccountPage } from "../pages/account.page";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test.use({ storageState: authFile });

test("login to the site", { tag: "@smoke" }, async ({ page }) => {
  const accountPage = new AccountPage(page);

  await test.step("Open homepage using saved authentication state", async () => {
    await page.goto("/");
  });

  await test.step("Verify that user is logged in", async () => {
    await expect(accountPage.navMenu).toHaveText("Jane Doe");
  });
});
//
