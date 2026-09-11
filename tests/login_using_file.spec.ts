import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/account.page';
import path from 'path';

const authFile = path.join(__dirname, "../playwright/.auth/user.json");


test.use({ storageState: authFile });

test('login to the site', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await page.goto('/');

  await expect(accountPage.navMenu).toHaveText('Jane Doe');
}); 
  // 