import { test, expect } from '@playwright/test';

test('User can logout successfully', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.locator('[name="email"]').fill('Ayush@gmail.com');
  await page.locator('[name="password"]').fill('098765');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('http://localhost:5173/');

  // Verify token cookie exists after login
  await expect
    .poll(async () => {
      const cookies = await page.context().cookies();
      return cookies.some(cookie => cookie.name === 'token');
    })
    .toBe(true);

  const logoutResponsePromise = page.waitForResponse(
    response =>
      response.url().includes('/api/auth/logout') &&
      response.request().method() === 'POST'
  );

  await page.getByRole('button', { name: 'Logout' }).click();

  const logoutResponse = await logoutResponsePromise;


  expect(logoutResponse.status()).toBe(200);

  await expect(page.locator('[name="email"]')).toBeVisible();

  const cookies = await page.context().cookies();
});