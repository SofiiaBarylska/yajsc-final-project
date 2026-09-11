import { expect } from "@playwright/test";
import { test } from "../fixtures";


test("login to the site with fixture", async ({ loggedInApp }) => {
  await expect(loggedInApp.page).toHaveURL("/account");
});
