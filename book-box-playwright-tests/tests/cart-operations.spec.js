const { test, expect } = require('@playwright/test');

test.describe('AddBookToCart_Success', () => {
    let page;
    test.beforeAll(async ({ browser}) => {
        page = await browser.newPage();
        await page.goto('https://bookbox.ch/');
        await page.locator('div').filter({ hasText: /^Bücher$/ }).first().click();
        await page.waitForTimeout(1000);
        await page.locator('div:nth-child(3) > .mantine-UnstyledButton-root').first().click();
        await page.waitForTimeout(1000);
        await page.locator('div:nth-child(2) > div:nth-child(3) > .mantine-UnstyledButton-root').click();
        await page.waitForTimeout(1000);
        await page.locator('div:nth-child(3) > .mantine-UnstyledButton-root').first().click();
        await page.waitForTimeout(1000);
        await page.locator('#mantine-r2-target').getByRole('img').click();
        await page.waitForTimeout(1000);
    });

    test('Book_RemoveFromCart_Success', async() => {
        await page.getByRole('cell', { name: 'CHF 376.00' }).getByRole('button').click();
        await expect.poll(async () => {
            const handle = await page.$('text=Distributed Coordination of Multi-agent ...');
            return handle === null;
        }, {
            timeout: 5000,
        }).toBe(true);
    });

    test('TableSumAfterRemoving_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByRole('table').getByText('CHF').nth(1);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("CHF 46.50");
    });

    test('ItemsTotalAfterRemoving_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('CHF 46.50').nth(3);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("CHF 46.50");
    });

    test('TotalAfterRemoving_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('CHF 46.50').nth(4);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("CHF 46.50");
    });

    test('BookNumberAfterIncreasing_Count_Success', async() => {
        await page.getByRole('table').getByText('+').click();
        await expect.poll(async () => {
            const handle = page.getByRole('table').getByText('2');
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("2");
    });

    test('TableSumAfterIncreasing_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByRole('table').getByText('CHF').nth(1);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("CHF 93.00");
    });

    test('ItemsTotalAfterIncreasing_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('CHF 93.00').nth(1);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("CHF 93.00");
    });

    test('TotalAfterIncreasing_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('CHF 93.00').nth(2);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("CHF 93.00");
    });

    test('BookNumberAfterDecreasing_Count_Success', async() => {
        await page.getByRole('table').getByText('-').click();
        await expect.poll(async () => {
            const handle = page.getByRole('table').getByText('1');
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("1");
    });

    test('SumAfterDecreasing_Count_Success', async() => {
        await expect.poll(async () => {
            const handle = page.getByText('CHF 46.50').nth(3);
            if (!handle) return null;
            return await handle.textContent();
        }, {
            timeout: 5000,
        }).toContain("CHF 46.50");
    });
});
