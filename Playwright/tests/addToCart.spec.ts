import { test, expect } from '../fixtures';
import { loginData } from '../test-data/login.data';
import { SignUpPage } from '../pages/signUp.page';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { EmailGenerator } from '../test-data/emailGenerator';
import { MainPage } from '../pages/main.page';
import { CartPage } from '../pages/cart.page';
import { ProductPage } from '../pages/product.page';

test.describe('Add product to cart', () => {
  let loginSignUpPage: LoginSignUpPage;
  let mainPage: MainPage;
  let cartPage: CartPage;
  let signUpPage: SignUpPage;
  let productPage: ProductPage;
  let email: string;
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

  test.afterEach(async ({ pageWithAdHandler }) => {
      await signUpPage.topNavigationBar.deleteAccountLink.click().catch(() => {});

  });

  test('Add one products to cart', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.product1.scrollIntoViewIfNeeded();
    await productPage.product1.dispatchEvent('click');

    //Asert
    await expect(mainPage.messageAddLabel).toHaveText(mainPage.messageAddText);

    await mainPage.continueShopping.click();
  });

  test('Add 3 products to cart', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.product1.dispatchEvent('click');
    await mainPage.continueShopping.click();
    await productPage.product4.dispatchEvent('click');
    await mainPage.continueShopping.click();
    await productPage.product15.dispatchEvent('click');
    await mainPage.vievCartLink.click();

    //Asert
    await expect(cartPage.textLabel).toHaveText(cartPage.shoppingCartText);
  });

  test('Add products to cart by category', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
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

    //Asert
    await expect(cartPage.countCartProduct).toHaveCount(3);
  });

  test('Add products to cart by brands', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await productPage.sideMenu.polo.click();
    await productPage.product8Polo.dispatchEvent('click');
    await mainPage.continueShopping.click();

    await productPage.sideMenu.madame.click();
    await productPage.product38Madame.dispatchEvent('click');
    await mainPage.continueShopping.click();

    await productPage.sideMenu.babyhug.click();
    await productPage.product15.dispatchEvent('click');
    await mainPage.continueShopping.click();

    await productPage.sideMenu.biba.click();
    await productPage.product40Biba.dispatchEvent('click');
    await mainPage.vievCartLink.click();

    //Asert
    await expect(cartPage.countCartProduct).toHaveCount(4);
  });
  test('Add 10 the same products', async ({ pageWithAdHandler }) => {
    //Arrange
    const quantity: number = 10;

    //Act
    await productPage.sideMenu.women.click();
    await productPage.sideMenu.womenDress.click();

    for (let i = 0; i < quantity; i++) {
      await productPage.product3Women.click();
      await mainPage.continueShopping.click();
    }

    await productPage.topNavigationBar.cartLink.click();

    //Asert
    await expect(cartPage.quantityProduct3).toHaveText(`${quantity}`);
  });
});
