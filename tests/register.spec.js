import { test, expect } from '@playwright/test';

test('User should register successfully', async ({ page }) => {

  // 1. Open login page
  await page.goto('http://localhost:5173/register');

  // 2. Enter username
  await page.getByPlaceholder('Enter Your Username')
    .fill('sam');

  // 3. Enter email
  await page.getByPlaceholder('Enter Your Email')
    .fill('sanchitjc821@gmail.com');

  // 4. Enter password
  await page.getByPlaceholder('Enter Your Password')
    .fill('12345678');

  // 5. Click login button
  await page.getByRole('button', { name: 'Register' })
    .click();

  // 6. Verify successful login (dashboard check)
  await expect(page).toHaveURL('http://localhost:5173/login');

});