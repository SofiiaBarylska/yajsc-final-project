import { test, expect } from '@playwright/test';

test('login to the site', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();

   await expect(page).toHaveURL('/account');;
   await expect(page.getByRole('heading', { name: 'My account' })).toHaveText('My account');
   await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
});