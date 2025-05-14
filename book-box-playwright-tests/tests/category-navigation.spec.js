const { test, expect, request } = require('@playwright/test');
const { Book } = require('../models/book');

test.describe('NavigationMenu_Display_Success', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://bookbox.ch');
    });

    test('ProductsMenu_Display_Success', async ({ page }) => {
        const mainProductMenu = page.locator('.mantine-Group-root > .mantine-Container-root');
        await expect(mainProductMenu).toBeVisible();
    });

    //can be parametrized for the other categories
    test('Submenu_Container_Display_Success', async ({ page }) => {
        page.getByRole('banner').getByText('Bücher', { exact: true }).hover();
        
        const submenu = page.locator('.__mantine-ref-drop').first();

        await expect(submenu).toBeVisible();
    });

    //can be parametrized for the other categories
    test('Submenu_Children_Visible_Success', async ({ page }) => {
        await page.getByRole('banner').getByText('Bücher', { exact: true }).hover();

        const submenuContainer = page.locator('.mantine-SimpleGrid-root.mantine-vt6ont').first();
        const submenuItems = submenuContainer.locator('.mantine-Text-root.mantine-1up9c3u');

        const count = await submenuItems.count();

        for (let i = 0; i < count; i++) {
            await expect(submenuItems.nth(i)).toBeVisible();
        }
    });

    test('Submenu_Contains_ExpectedCategories', async ({ page }) => {
        await page.getByRole('banner').getByText('Bücher', { exact: true }).hover();
        const categories = page.locator('div.__mantine-ref-drop div.mantine-Text-root');

        await expect(categories).toContainText(['Belletristik', 'Kinder- und Jugendbücher', 'Reiseführer', 'Hotelführer, Restaurantführer'
            , 'Karten, Stadtpläne, Atlanten', 'Bildbände', 'Reiseberichte, Reiseerzählungen', 'Ratgeber', 'Geisteswissenschaften, Kunst und Musik',
            'Geisteswissenschaften allgemein' ,'Studienbereiche', 'Schule, Lernen', 'Sachbücher'
        ]);
    });
});

test.describe('NavigationMenu_Select_Success', () => {
    test('NavMenucategory_Select_Success', async ({ page }) => {
        await page.goto('https://bookbox.ch');

        await page.locator('div').filter({ hasText: /^Bücher$/ }).first().click();

        await expect.poll(() => decodeURIComponent(page.url())).toContain('Bücher');
    });

    test('CategoryTitle_Display_Success', async ({page}) => {
        const product = encodeURIComponent('Bücher');
        await page.goto(`https://bookbox.ch/categories/${product}`);

        await expect.poll(async () => {
            return await page.getByRole('heading', { name: 'Bücher' }).isVisible();
        }).toBe(true);
    });

    test('NavMenuSubcategory_Select_Success', async ({ page }) => {
        await page.goto('https://bookbox.ch');
        await page.locator('div').filter({ hasText: /^Bücher$/ }).first().hover();
        await page.getByRole('banner').getByText('Belletristik', { exact: true }).click();
        
        await expect.poll(() => decodeURIComponent(page.url())).toContain('Bücher/Belletristik');
    });

    test('SubcategoryTitle_Display_Success', async ({page}) => {
        //BUG
        //path sometimes shows "beletristik" books, sometimes all books
        const product = encodeURIComponent('Bücher');
        await page.goto(`https://bookbox.ch/categories/${product}/Belletristik`);
        
        await expect.poll(async () => {
            return await page.getByRole('heading', { name: 'Belletristik' }).isVisible();
        }).toBe(true);
    });
});

test.describe('SideMenu_Success', () => {
    test.beforeEach(async ({ page }) => {
        const product = encodeURIComponent('Bücher');
        await page.goto(`https://bookbox.ch/categories/${product}`);    
    });

    test('SideMenuTitle_Display_Success', async ({page}) => {
        await expect.poll(async () => {
            const titleLocator = page.getByText('Bücher', { exact: true }).nth(1);
            return await titleLocator.isVisible();
        }).toBe(true);
    });

    test('SideMenuTypeOfSybcategory_Hide_Success', async ({page}) => {
        await page.locator('.mantine-1avyp1d > .mantine-UnstyledButton-root').first().click();
        await expect.poll(async () => {
            return page.getByRole('main').getByText('Belletristik').isHidden();
        }).toBe(true);
    });

    test('SideMenuTypeOfSybcategory_Display_Success', async ({page}) => {
        await page.locator('.mantine-1zsrnl > div:nth-child(2) > .mantine-1zsrnl > .mantine-Group-root > .mantine-1avyp1d > .mantine-UnstyledButton-root').click();

        await expect(page.getByRole('main').getByText('Erzählende Literatur')).toBeVisible();
    });

    test('SideMenuSubcategory_Select_Success', async ({page}) => {
        //BUG
        //url does not change after clicking on subcategory
        await page.locator('a').filter({ hasText: 'Reiseführer' }).click();

        await expect.poll(() => decodeURIComponent(page.url())).toContain('Reiseführer');
    });

    test('SideMenuTypeOfSybcategory_Select_Success', async ({page}) => {
        await page.locator('.mantine-1zsrnl > div:nth-child(2) > .mantine-1zsrnl > .mantine-Group-root > .mantine-1avyp1d > .mantine-UnstyledButton-root').click();

        await page.getByText('Anthologien').click();

        //BUG
        //url does not change after clicking on type of subcategory
        await expect.poll(() => decodeURIComponent(page.url())).toContain('Anthologien');
    });
});

test.describe('API_CategoryNavigation_Testing', () => {
    //rest of the categories should be added
    const categories = [90, 100, 110, 120];

    categories.forEach((categoryId) => {
        test(`API_GetBooksByCategory${categoryId}_Status_200_Success`, async () => {
            const apiContext = await request.newContext();

            const response = await apiContext.post(`https://api.bookbox.ch/category/${categoryId}`, {
                data: {
                    orderBy: { key: '', type: '' },
                    limit: 20,
                    offset: 1,
                    page: 1,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            expect(response.status()).toBe(200);
        });
    });

    categories.forEach((categoryId) => {
        test(`API_GetBooksByCategory${categoryId}_Response_BookArray_Success`, async () => {
            const apiContext = await request.newContext();
            const response = await apiContext.post(`https://api.bookbox.ch/category/${categoryId}`, {
                data: {
                    orderBy: {
                        key: '',
                        type: ''
                    },
                    limit: 20,
                    offset: 1,
                    page: 1
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const body = await response.json();
            const books = body.data.map(item => new Book(item));
            for (const book of books) {
                expect(book).toBeInstanceOf(Book);
                expect(book.isValid()).toBe(true);
            }
        });
    });
});

test.describe('NumberOfSelectedBooks_Success', () => {
    //rest of the categories should be added
    const categoryIds = [90, 100, 310];
    const categoryNames = ['Bücher', 'Bücher/Belletristik', 'Bücher/Reiseführer'];

    categoryIds.forEach((categoryId, index) => {
        test(`NumberOfBooksInCategory${categoryId}_EqualToDataLenght_Sucess`, async({page}) => {
            const apiContext = await request.newContext();
            const response = await apiContext.post(`https://api.bookbox.ch/category/${categoryId}`, {
                data: {
                    orderBy: { key: '', type: '' },
                    limit: 1001,
                    offset: 1,
                    page: 1,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const body = await response.json();
            const numberOfBooks = body.data.length;

            await page.goto(`https://bookbox.ch/categories/${categoryNames[index]}`);
            const shownNumberText = page.locator('text=/\\d+\\+? Produkte sind gelistet/');
            await expect(shownNumberText).toBeVisible({ timeout: 5000 });
            const text = await shownNumberText.textContent();
            const shownNumber = parseInt(text.match(/\d+/)[0]);

            if(numberOfBooks > 1000) {
                expect(shownNumber).toEqual(1000);
            } else {
                expect(shownNumber).toEqual(numberOfBooks);
            }
        });
    });
});