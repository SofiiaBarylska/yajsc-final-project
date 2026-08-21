import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

test('login to the site', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto('/auth/login');
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL('/account');
  await expect(accountPage.pageTitle).toHaveText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
}); 
  // 