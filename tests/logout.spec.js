import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('User can logout successfully', async ({ page }) => {

  await page.goto('http://localhost:5173/login');

  
  await page.locator('[name="email"]').fill('Ayush@gmail.com');
  await page.locator('[name="password"]').fill('098765');

  await page.getByRole('button', {
    name: 'Login',
  }).click();

  
  await expect(page).toHaveURL('http://localhost:5173/');

  
  const logoutResponsePromise = page.waitForResponse((response) => {
    return (
      response.url().includes('/api/auth/logout') &&
      response.request().method() === 'POST'
    );
  });

  
  await page.getByRole('button', {
    name: 'Logout',
  }).click();

  
  const logoutResponse = await logoutResponsePromise;

  
  expect(logoutResponse.status()).toBe(200);

  
  await page.waitForTimeout(2000);

  
  console.log('Current URL:', page.url());


  const cookies = await page.context().cookies();
  console.log('Cookies after logout:', cookies);

  
  const emailField = page.locator('[name="email"]');

  if (await emailField.isVisible()) {
    console.log('Login page is visible');
  } else {
    console.log('Login page is NOT visible');
  }

  
  await expect(emailField).toBeVisible();
});