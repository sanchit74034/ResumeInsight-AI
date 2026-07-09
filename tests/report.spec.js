import { test, expect } from '@playwright/test';

test.setTimeout(180000); // 3 minutes

test('Open protected report by ID', async ({ page }) => {

  await page.goto('http://localhost:5173/login');

  // Login
  await page.locator('[name="email"]').fill('Ayush@gmail.com');
  await page.locator('[name="password"]').fill('098765');

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  await expect(page).toHaveURL('http://localhost:5173/');

  // Upload Resume
  await page.setInputFiles(
    '#resume-input',
    'tests/fixtures/DUMMY_RESUME.pdf'
  );
  // Fill form
  await page.locator('#job-description-input')
    .fill('Data Scientist');

  await page.locator('#self-description-input')
    .fill('Python ML SQL');

  // Generate button
  const generateBtn = page.getByRole('button', {
    name: /Generate My Interview Strategy/i
  });

  await expect(generateBtn).toBeEnabled();

  // Wait for report page and click together
  await Promise.all([
    page.waitForURL('**/interview/**', {
      timeout: 120000
    }),
    generateBtn.click()
  ]);

  // Validate report URL
  await expect(page.url()).toContain('/interview/');

  // Validate report sections
  await expect(
    page.getByRole('button', {
      name: 'Technical questions'
    })
  ).toBeVisible();

  await expect(
    page.getByRole('button', {
      name: 'Behavioral questions'
    })
  ).toBeVisible();

  await expect(
    page.locator('#score-input')
  ).toBeVisible();

  await expect(
    page.locator('#skill-input')
  ).toBeVisible();

  // Roadmap section
  await page.getByRole('button', {
    name: 'Road Map'
  }).click();

  await expect(
    page.getByText('Preparation Roadmap')
  ).toBeVisible();

});