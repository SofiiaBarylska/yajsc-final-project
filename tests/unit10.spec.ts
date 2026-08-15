import { test, expect } from '@playwright/test';

test('login to the site', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
  await page.getByPlaceholder('Your password').fill('welcome01');
  await page.getByRole('button', { name: 'Login' }).click();


   await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
   await expect(page.getByRole('heading', { name: 'My account' })).toHaveText('My account');
   await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
});