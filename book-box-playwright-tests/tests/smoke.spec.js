const { test, expect } = require('@playwright/test');

test('HomePage_Load_Success', async ({ page }) => {
  await page.goto('https://bookbox.ch');
  await expect(page).toHaveTitle(/BookBox/i);
});
