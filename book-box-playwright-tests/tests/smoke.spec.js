const { test, expect } = require('@playwright/test');

test('Homepage loads', async ({ page }) => {
  await page.goto('https://bookbox.ch');
  await expect(page).toHaveTitle(/BookBox/i);
});

/*test('Verify Book data API returns correct data', async ({ request }) => {
  const response = await request.get('https://bookbox.ch/api/books');
  expect(response.status()).toBe(200);  // Provera statusa odgovora
  const books = await response.json();
  expect(books).toBeInstanceOf(Array);  // Provera da odgovor sadrži niz knjiga
});*/
