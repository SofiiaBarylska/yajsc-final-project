import { test} from "@playwright/test";
import { customer } from "../../test-data/users";
import { AuthService } from "../../pages/api/authService";
import { HeaderFragments } from "../../pages/fragments/headerFragments";

test("Verify login can be performed successfully", async ({ page, request}) => {
  const header = new HeaderFragments(page);
  await page.goto("/");

  const authService = new AuthService(request);

  const token = await authService.login(customer.email, customer.password);
  await page.evaluate((token) => {
    localStorage.setItem("auth-token", token);
  }, token);
  await page.reload();

  await header.isUserLoggedIn("Jane Doe");
});
