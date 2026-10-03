import { expect } from "@playwright/test";
import { test } from "../fixtures";

test("login to the site with fixture", { tag: "@smoke" }, async ({ loggedInApp }) => {
  await test.step("Verify that user is logged in", async () => {
    await expect(loggedInApp.page).toHaveURL("/");
  });
});
