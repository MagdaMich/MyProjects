import { test, expect } from '../fixtures';
import { loginData } from '../test-data/login.data';
import { SignUpPage } from '../pages/signUp.page';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { EmailGenerator } from '../test-data/emailGenerator';
import { MainPage } from '../pages/main.page';
import { CartPage } from '../pages/cart.page';
import { ProductPage } from '../pages/product.page';

test.describe('Delete product from the cart', () => {
  let loginSignUpPage: LoginSignUpPage;
  let mainPage: MainPage;
  let cartPage: CartPage;
  let signUpPage: SignUpPage;
  let productPage: ProductPage;
  let email;
  const userId = loginData.userId;
  const password = loginData.userPassword;

  test.beforeEach(async ({ pageWithAdHandler }) => {
    const emailGenerator = new EmailGenerator();
    email = emailGenerator.generateEmail();
    loginSignUpPage = new LoginSignUpPage(pageWithAdHandler);
    signUpPage = new SignUpPage(pageWithAdHandler);
    mainPage = new MainPage(pageWithAdHandler);
    cartPage = new CartPage(pageWithAdHandler);
    productPage = new ProductPage(pageWithAdHandler);

    await pageWithAdHandler.goto('/');

    await loginSignUpPage.singUp(userId, email);
    await signUpPage.singUpSuccefull(
      password,
      signUpPage.day,
      signUpPage.month,
      signUpPage.years,
      signUpPage.name,
      signUpPage.lastName,
      signUpPage.company,
      signUpPage.adress,
      signUpPage.country,
      signUpPage.state,
      signUpPage.city,
      signUpPage.zipCode,
      signUpPage.phone,
    );
    await signUpPage.continueButton.click();
  });

  test.afterEach(async ({pageWithAdHandler}) => {
     try {
      await signUpPage.topNavigationBar.deleteAccountLink.click();
      await signUpPage.continueButton.click({ force: true, timeout: 3000 });
    } catch (error) {
      console.log('Delete account cleanup failed:', error);
    }
  });

  test('Delete produt', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.product1.dispatchEvent('click');
    await mainPage.vievCartLink.click();
    await cartPage.deleteProduct.click();

    //Asert
    await expect(cartPage.emptyCart).toHaveText(cartPage.emptyCartText);
  });

  test('Delete product and continue shopping', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.product1.dispatchEvent('click');
    await mainPage.vievCartLink.click();
    await cartPage.deleteProduct.click();
    await cartPage.clickHereLink.click();

    //Asert
    await expect(productPage.topNavigationBar.productLink).toBeEnabled();
  });

  test('Delete 10 the same products', async ({ pageWithAdHandler }) => {
    //Arrange
    const quantity: number = 10;
    await productPage.sideMenu.women.click();
    await productPage.sideMenu.womenDress.click();

    for (let i = 0; i < quantity; i++) {
      await productPage.product3Women.click();
      await mainPage.continueShopping.click();
    }
    await productPage.topNavigationBar.cartLink.click();

    //Act
    await cartPage.deleteProduct.click();

    //Asert
    await expect(cartPage.emptyCart).toHaveText(cartPage.emptyCartText);
  });

  test('Delete 3 products', async ({ pageWithAdHandler }) => {
    //Arrange
    await productPage.sideMenu.women.click();
    await productPage.sideMenu.womenDress.click();
    await productPage.product3Women.dispatchEvent('click');
    await mainPage.continueShopping.click();

    await productPage.sideMenu.men.click();
    await productPage.sideMenu.menJeans.click();
    await productPage.product35Men.dispatchEvent('click');
    await mainPage.continueShopping.click();

    await productPage.sideMenu.kids.click();
    await productPage.sideMenu.kidsTopShirts.click();
    await productPage.product15.dispatchEvent('click');
    await mainPage.vievCartLink.click();

    let number: number = 2; ;

    //Act
    for (let i = 0; i < 3; i++) {
      await cartPage.deleteProduct.nth(number).click();
      number--;
    }
    // await cartPage.deleteProduct.nth(2).click();
    // await cartPage.deleteProduct.nth(1).click();
    // await cartPage.deleteProduct.nth(0).click();
    await cartPage.emptyCart.click();

    //Asert
    await expect(cartPage.emptyCart).toHaveText(cartPage.emptyCartText);
  });
});
