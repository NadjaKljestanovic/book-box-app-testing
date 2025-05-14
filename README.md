# book-box-app-testing
## About the Project

This project is created for testing the **BookBox.ch** website. It uses **JavaScript** with **Playwright**.

**Playwright** is a modern end-to-end testing framework developed by Microsoft. It was chosen because of its good integration with JavaScript, and its ability to handle modern web applications efficiently. It supports multiple browsers (Chromium, Firefox, WebKit) and allows testing with minimal configuration.

### Why Playwright + JavaScript?

JavaScript was preferable programming language for this task. Playwright works seamlessly with JavaScript, which is one of the most widely used languages for web development. Some advantages of this combination are:

- **Native async/await syntax** – allows writing clear and readable asynchronous test code.
- **Cross-browser support** – no additional configuration is needed to test in multiple browsers.
- **Auto-waiting** – Playwright waits for elements to be ready before interacting with them, reducing the number of flaky tests.
- **Network and console logging** – easy access to network requests, responses, and browser console messages.
- **Modern API design** – intuitive and developer-friendly.

Compared to **Selenium**, Playwright is faster, more modern, and provides better support for dynamic web content and single-page applications (SPAs). Unlike **Cypress**, Playwright supports multiple tabs, frames, and mobile emulation, which makes it more flexible for complex scenarios.

### Downsides of Using Playwright

Playwright also has some disadvantages:

- **Newer ecosystem** – compared to Selenium, Playwright has a smaller community and fewer plugins.
- **Larger setup** – some users might find the initial setup (browser downloads, test runner configuration) a bit heavy.
- **Less beginner-friendly than Cypress** – especially for testers who are not familiar with coding or async programming.

## Setup & Running tests

1. **Open the project in Visual Studio Code**  
   Clone or download the project folder, then open it using Visual Studio Code.

2. **Install dependencies**  
   Open the terminal in VS Code and run the following command to install all necessary dependencies:
   `npm install`

3. **Tests execution**
    `npm run test`

## Test cases description

In this paragaph, test cases are divided by files, and described.

### smoke.spec.js

- **HomePage_Load_Success**: This is the first and basic test, ensuring that the homepage of **BookBox.ch** loads successfully and the page title contains the word "BookBox."

### category-navigation.spec.js

NavigationMenu_Display_Success suite:

- **ProductsMenu_Display_Success**: Verifies that the main product menu is visible on the homepage.
- **Submenu_Container_Display_Success**: Checks if the submenu container appears when hovering over the "Bücher" category.
- **Submenu_Children_Visible_Success**: Ensures that all submenu items under "Bücher" are visible.
- **Submenu_Contains_ExpectedCategories**: Verifies that the submenu contains specific categories like "Belletristik" and "Kinder- und Jugendbücher."

NavigationMenu_Select_Success suite:

- **NavMenucategory_Select_Success**: Tests selecting the "Bücher" category from the navigation menu and checks the URL.
- **CategoryTitle_Display_Success**: Ensures the category title "Bücher" is visible after navigating to the category page.
- **NavMenuSubcategory_Select_Success**: Tests selecting the "Belletristik" subcategory and checks the URL.
- **SubcategoryTitle_Display_Success**: Verifies that the "Belletristik" title is visible after navigating to the subcategory page.

SideMenu_Success suite:

- **SideMenuTitle_Display_Success**: Ensures the side menu title for "Bücher" is visible.
- **SideMenuTypeOfSybcategory_Hide_Success**: Tests hiding a specific type of subcategory in the side menu.
- **SideMenuTypeOfSybcategory_Display_Success**: Verifies that a specific type of subcategory is visible in the side menu.
- **SideMenuSubcategory_Select_Success**: Tests selecting a subcategory (e.g., "Reiseführer") from the side menu and checks the URL.
- **SideMenuTypeOfSybcategory_Select_Success**: Verifies that selecting a subcategory type (e.g., "Anthologien") updates the URL.

API_CategoryNavigation_Testing suite:

- **API_GetBooksByCategory{categoryId}_Status_200_Success**: Ensures that the API responds with a 200 status when retrieving books by category.
- **API_GetBooksByCategory{categoryId}_Response_BookArray_Success**: Verifies that the API returns valid books for each category.

NumberOfSelectedBooks_Success suite:

- **NumberOfBooksInCategory{categoryId}_EqualToDataLenght_Success**: Ensures the number of books shown on the website matches the number returned by the API for a given category.

### add-to-cart.spec.js

BookSearch_Success suite:

- **InputField_FillsCorrectly_Success**: Verifies that the search input is filled correctly with the book title.
- **SearchButtonClick_UrlChanged_Success**: Verifies that clicking the search button updates the URL with the search query.
- **SearchResults_Display_Success**: Verifies that search results display books matching the search query.

AddToCart_Success suite:

- **AddToCart_IconNumberVisible_Success**: Verifies that the cart icon number is visible after adding a book to the cart.
- **AddToCart_MultipleItems_IconNumberIncreases_Success**: Verifies that the cart icon number increases when multiple books are added to the cart.

AddToCart_Navigation_Success suite:

- **NavigateToCart_CartIconClick_Success**: Verifies that clicking the cart icon navigates to the cart page.

CartScreen_ItemsAdded_Success suite:

- **BookAddedToCart_TitleDisplay_Success**: Verifies that the added book appears in the cart with the correct title.
- **ItemsTotalAfterAddingToCart_Count_Success**: Verifies that the total price of items in the cart is correctly displayed after adding a book.
- **TotalAfterAddingToCart_Count_Success**: Verifies that the total amount in the cart is updated correctly after adding a book.

API_Search_And_AddToCart_Testing suite:

- **SearchrequestWithParameters_Status_200_Success**: Verifies that the search API returns status 200 with valid search parameters.
- **SearchrequestWithParameters_Response_BookArray_Success**: Verifies that the search API returns an array of books that match the search query.
- **SearchrequestWithParameters_BookNotFound_Status_200_Success**: Verifies that the search API returns an empty array when no books are found.
- **AddToCartMethod_Status_200_Success**: Verifies that adding a book to the cart through the API returns status 200.

### cart-operations.spec.js

AddBookToCart_Success suite:

- **Book_RemoveFromCart_Success**: Verifies that the book is removed from the cart after clicking the remove button.
- **TableSumAfterRemoving_Count_Success**: Verifies that the sum in the table is correctly updated after removing a book from the cart.
- **ItemsTotalAfterRemoving_Count_Success**: Verifies that the total of the items in the cart is correctly updated after removing a book.
- **TotalAfterRemoving_Count_Success**: Verifies that the total amount in the cart is updated correctly after removing a book.
- **BookNumberAfterIncreasing_Count_Success**: Verifies that the book count in the cart increases after clicking the "+" button.
- **TableSumAfterIncreasing_Count_Success**: Verifies that the sum in the table is correctly updated after increasing the book count.
- **ItemsTotalAfterIncreasing_Count_Success**: Verifies that the total of the items in the cart is correctly updated after increasing the book count.
- **TotalAfterIncreasing_Count_Success**: Verifies that the total amount in the cart is updated correctly after increasing the book count.
- **BookNumberAfterDecreasing_Count_Success**: Verifies that the book count in the cart decreases after clicking the "-" button.
- **TableSumAfterDecreasing_Count_Success**: Verifies that the sum in the table is correctly updated after decreasing the book count
- **ItemsTotalAfterDecreasing_Count_Success**: Verifies that the total of the items in the cart is correctly updated after decreasing the book count.
- **TotalAfterDecreasing_Count_Success**: Verifies that the total amount in the cart is updated correctly after decreasing the book count.

## Additional information

### Founded bugs

- **SubcategoryTitle_Display_Success**
The issue is that when clicking on the "Belletristik" category in the navigation menu, the URL changes. However, when this URL is reloaded in the browser (`https://bookbox.ch/Bücher/Belletristik`), all books are displayed without the category filter being applied, and the category title is also missing. 

- **SideMenuSubcategory_Select_Success**
When clicking on a category from the side menu, the URL does not change as expected. Instead, the page only shows the books of the choosen category, while the URL remains `https://bookbox.ch/Bücher`. If you select the "Belletristik" category from the navigation menu and then change to a different category in the sidebar, the URL remains `https://bookbox.ch/Bücher/Belletristik`.

- **SideMenuTypeOfSybcategory_Select_Success**
The same problem mentioned before. When clicking on a subcategory from the side menu, the URL does not change as expected. Instead, the page only shows the books of the choosen subcategory, while the URL remains `https://bookbox.ch/Bücher`. If you select the "Belletristik" category from the navigation menu and then change to a different category in the sidebar, the URL remains `https://bookbox.ch/Bücher/Belletristik`.

### Generating Test Code with Playwright
It is common to use the following command to generate test code for a specific website:
`npx playwright codegen https://bookbox.ch`

This command opens a browser window and allows you to interact with the website. As you perform actions in the browser, Playwright automatically generates the corresponding test code in real time. This can be helpful for quickly creating automated tests for common interactions, such as clicks, form submissions, and navigation.

### Code Linting with ESLint  
The project uses **ESLint** to ensure code quality and adherence to coding standards. To run ESLint on your code, use the following command:
`npx eslint tests/`

This command will check the code in the `tests/` directory for any syntax errors, stylistic issues, or potential problems. If any issues are found, ESLint will provide suggestions for how to fix them.