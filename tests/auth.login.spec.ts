import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { customer } from '../test-data/users'; 
import path from 'path';

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test('login to the site', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');
  await loginPage.login(customer.email, customer.password);
    await expect(page).toHaveURL('/account');
    
    await page.context().storageState({ path: authFile });
}); 