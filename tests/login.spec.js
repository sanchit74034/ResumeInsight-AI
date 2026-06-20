import { test, expect } from '@playwright/test';

test('User should login successfully', async ({ page }) => {

  // 1. Open login page
  await page.goto('http://localhost:5173/login');

  // 2. Enter email
  await page.getByPlaceholder('Enter Your Email')
    .fill('sanchitjc821@gmail.com');

  // 3. Enter password
  await page.getByPlaceholder('Enter Your Password')
    .fill('12345678');

  // 4. Click login button
  await page.getByRole('button', { name: 'Login' })
    .click();

  // 5. Verify successful login (dashboard check)
  await expect(page).toHaveURL('http://localhost:5173/');

});