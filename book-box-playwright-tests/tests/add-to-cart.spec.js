const { test, expect, request } = require('@playwright/test');
const { Book } = require('../models/book');

test.describe('BookSearch_Success', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://bookbox.ch');
        await page.getByRole('textbox', { name: 'Titel, Author, ISBN...' }).fill('Distributed Coordination of Multi-agent Networks');
    });

    test('InputField_FillsCorrectly_Success', async ({page}) => {
        await expect.poll(async () => {
            return page.getByRole('textbox', { name: 'Titel, Author, ISBN...' }).inputValue();
        }, {
            timeout: 5000,
        }).toBe("Distributed Coordination of Multi-agent Networks");
    });

    test('SearchButtonClick_UrlChanged_Success', async ({page}) => {
        await page.getByText('Suchen').first().click();
        await expect.poll(async () => {
            return decodeURIComponent(page.url());
        }, {
            timeout: 5000,
        }).toContain("Distributed Coordination of Multi-agent Networks");
    });

    test('SearchResults_Display_Success', async ({page}) => {
        await page.getByText('Suchen').first().click();
        await page.waitForLoadState('networkidle');
        const titles = await page.getByText('Distributed Coordination of').allTextContents();
        for (const title of titles) {
            expect(title).toContain('Distributed Coordination of Multi-agent');
        }
    });
});

test.describe('AddToCart_Success', () => {
    let page;
    test.beforeAll(async ({ browser}) => {
        page = await browser.newPage();
        await page.goto('https://bookbox.ch/');
        await page.locator('div').filter({ hasText: /^Bücher$/ }).first().click();
        await page.waitForTimeout(1000);
        await page.locator('div:nth-child(3) > .mantine-UnstyledButton-root').first().click();
        await page.waitForTimeout(1000);
    });

    test('AddToCart_IconNumberVisible_Success', async () => {
        await expect.poll(async () => {
            const handle = page.locator('.mantine-MachineNumber-currentNumber');
            if (!handle) return null;
            return await handle.isVisible();
        }, {
            timeout: 5000,
        }).toBe(true);
    });

    test('AddToCart_MultipleItems_IconNumberIncreases_Success', async () => {
        await page.locator('div:nth-child(2) > div:nth-child(3) > .mantine-UnstyledButton-root').click();
        await expect.poll(async () => {
            const handle = page.locator('.mantine-MachineNumber-currentNumber');
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toBe("2");
    });
});

test.describe('AddToCart_Navigation_Success', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://bookbox.ch/');
        await page.locator('div').filter({ hasText: /^Bücher$/ }).first().click();
        await page.waitForTimeout(1000);
        await page.locator('div:nth-child(3) > .mantine-UnstyledButton-root').first().click();
        await page.waitForTimeout(1000);
        await page.locator('#mantine-r2-target').getByRole('img').click();
        await page.waitForTimeout(1000);
    });

    test('NavigateToCart_CartIconClick_Success', async ({page}) => {
        expect(page.url()).toBe("https://bookbox.ch/checkout/cart");
    });
});

test.describe('CartScreen_ItemsAdded_Success', () => {
    let page;
    test.beforeAll(async ({ browser}) => {
        page = await browser.newPage();
        await page.goto('https://bookbox.ch/');
        await page.locator('div').filter({ hasText: /^Bücher$/ }).first().click();
        await page.waitForTimeout(1000);
        await page.locator('div:nth-child(3) > .mantine-UnstyledButton-root').first().click();
        await page.waitForTimeout(1000);
        await page.locator('#mantine-r2-target').getByRole('img').click();
        await page.waitForTimeout(1000);
    });

    test('BookAddedToCart_TitleDisplay_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('Distributed Coordination of Multi-agent ...');
            if (!handle) return null;
            return handle.isVisible();
        }, {
            timeout: 5000,
        }).toBe(true);
    });

    test('ItemsTotalAfterAddingToCart_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('CHF 188.00').nth(3);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toBe("CHF 188.00");
    });

    test('TotalAfterAddingToCart_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('CHF 188.00').nth(4);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toBe("CHF 188.00");
    });
});

test.describe('API_AddToCart_Testing', () => {
    test('SearchrequestWithParameters_Status_200_Success', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post('https://api.bookbox.ch/list', {
            data: {
                entity: 'product',
                metadata: {
                    filter: {
                        must: [
                            {
                                key: 'special',
                                value: 'Distributed Coordination of Multi-agent Networks'
                            }
                        ]
                    },
                    orderBy: { key: '', type: '' },
                    limit: 20,
                    offset: 1
                }
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
    });

    test('SearchrequestWithParameters_Response_BookArray_Success', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post('https://api.bookbox.ch/list', {
            data: {
                entity: 'product',
                metadata: {
                    filter: {
                        must: [
                            {
                                key: 'special',
                                value: 'Distributed Coordination of Multi-agent Networks'
                            }
                        ]
                    },
                    orderBy: { key: '', type: '' },
                    limit: 20,
                    offset: 1
                }
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const body = await response.json();
        const books = body.data.map(item => new Book(item));
        for (const book of books) {
            expect(book).toBeInstanceOf(Book);
            expect(book.isValid()).toBe(true);
            expect(book.title).toContain('Distributed Coordination of Multi-agent Networks');
        }
    });

    test('SearchrequestWithParameters_BookNotFound_Status_200_Success', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post('https://api.bookbox.ch/list', {
            data: {
                entity: 'product',
                metadata: {
                    filter: {
                        must: [
                            {
                                key: 'special',
                                value: 'xxxxxxx'
                            }
                        ]
                    },
                    orderBy: { key: '', type: '' },
                    limit: 20,
                    offset: 1
                }
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.length).toBe(0);
    });

    test('AddToCartMethod_Status_200_Success', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post('https://api.bookbox.ch/update', {
            data: {
            entity: "cart",
            data: {
                id: "9c987b20-2db7-4715-9b76-784d8ee5ba09",
                cart_items: [
                    {
                        product_id: "10000011",
                        quantity: 1
                    }
                ]},
                metadata: {
                    override_on_update: ["cart_items"]
                }
            },
            headers: {
                'Content-Type': 'application/json',
            },
            });

        expect(response.status()).toBe(200);
    });
});