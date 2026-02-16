import { test, expect } from '../fixtures';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { EmailGenerator } from '../test-data/emailGenerator';
import { ProductPage } from '../pages/product.page';
import { SingleProductPage } from '../pages/singleProduct.page';
import { MainPage } from '../pages/main.page';
import { CartPage } from '../pages/cart.page';

test.describe('Product page', () => {
  let loginSignUp: LoginSignUpPage;
  let productPage: ProductPage;
  let singleProductPage: SingleProductPage;
  let mainPage: MainPage;
  let cartPage: CartPage;
  let email: string;

  test.beforeEach(async ({ pageWithAdHandler }) => {
    productPage = new ProductPage(pageWithAdHandler);
    singleProductPage = new SingleProductPage(pageWithAdHandler);
    loginSignUp = new LoginSignUpPage(pageWithAdHandler);
    mainPage = new MainPage(pageWithAdHandler);
    cartPage = new CartPage(pageWithAdHandler);
    const emailGenerator = new EmailGenerator();
    email = emailGenerator.generateEmail();

    await pageWithAdHandler.goto('/');
    
  });

  test('Entry to the product page', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.viewProduct1.click();

    //Assert
    await expect(pageWithAdHandler).toHaveURL(
      'https://www.automationexercise.com/product_details/1',
    );
  });

  test('Change quantity products and add to cart', async ({ pageWithAdHandler }) => {
  //Arrange
  const quantity = '12'
  await productPage.viewProduct1.click();

  //Act
  await singleProductPage.quantityInput.click();
  await singleProductPage.quantityInput.clear();
  await singleProductPage.quantityInput.fill(quantity);
  await singleProductPage.addToCartButton.click();
  await mainPage.vievCartLink.click();

  //Assert
  await expect(cartPage.quantityLabel).toHaveText(quantity);
});

  test('Add review to product (successful)', async ({pageWithAdHandler}) => {
    //Arrange
    await productPage.viewProduct1.click();

    //Act
    await singleProductPage.addReview(
      singleProductPage.name,
      email,
      singleProductPage.review,
    );
    await singleProductPage.submitButton.click();

    //Assert
    await expect(singleProductPage.messageLabel).toHaveText(
      singleProductPage.messageText,
    );
  });

  test('Add review to product (unsuccessful) - Empty name', async ({pageWithAdHandler}) => {
    //Arrange
    const emptyName = '';
    await productPage.viewProduct1.click();

    //Act
    await singleProductPage.addReview(
      emptyName,
      email,
      singleProductPage.review,
    );
    await singleProductPage.submitButton.click();

    //Assert
    const validationMessage = await singleProductPage.nameInput.evaluate(
      (element) => {
        const input = element as HTMLInputElement;
        return input.validationMessage;
      },
    );
    await expect(validationMessage).toContain(loginSignUp.valueMissingMessage);
  });

  test('Add review to product (unsuccessful) - Empty email', async ({pageWithAdHandler}) => {
    //Arrange
    const emptyEmail = '';
    await productPage.viewProduct1.click();

    //Act
    await singleProductPage.addReview(
      singleProductPage.name,
      emptyEmail,
      singleProductPage.review,
    );
    await singleProductPage.submitButton.click();

    //Assert
    const validationMessage = await singleProductPage.emailInput.evaluate(
      (element) => {
        const input = element as HTMLInputElement;
        return input.validationMessage;
      },
    );
    await expect(validationMessage).toContain(loginSignUp.valueMissingMessage);
  });

  test('Add review to product (unsuccessful) - Empty review', async ({pageWithAdHandler}) => {
    //Arrange
    const emptyReview = '';
    await productPage.viewProduct1.click();

    //Act
    await singleProductPage.addReview(
      singleProductPage.name,
      email,
      emptyReview,
    );
    await singleProductPage.submitButton.click();

    //Assert
    const validationMessage = await singleProductPage.reviewInput.evaluate(
      (element) => {
        const input = element as HTMLInputElement;
        return input.validationMessage;
      },
    );
    await expect(validationMessage).toContain(loginSignUp.valueMissingMessage);
  });
});
