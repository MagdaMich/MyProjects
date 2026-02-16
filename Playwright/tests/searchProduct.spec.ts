import { test, expect } from '../fixtures';
import { ProductPage } from '../pages/product.page';
import { MainPage } from '../pages/main.page';

test.describe('Search product in product page', () => {
  let productPage: ProductPage;
  let mainPage: MainPage;

  test.beforeEach(async ({ pageWithAdHandler }) => {
    productPage = new ProductPage(pageWithAdHandler);
    mainPage = new MainPage(pageWithAdHandler);

    await pageWithAdHandler.goto('/');
    
    await productPage.topNavigationBar.productLink.click();
  });

  test('Search product (successful)', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.searchInput.fill(productPage.productNameText);
    await productPage.searchButton.click();

    //Assert
    await expect(productPage.productTextLabel).toHaveText(productPage.productText);
  });

  test('Search product (unsuccessful)', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.searchInput.fill(productPage.badProductNameText);
    await productPage.searchButton.click();

    //Assert

  });
});
