import { test, expect } from '../fixtures';
import { loginData } from '../test-data/login.data';
import { SignUpPage } from '../pages/signUp.page';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { EmailGenerator } from '../test-data/emailGenerator';
import { MainPage } from '../pages/main.page';
import { CartPage } from '../pages/cart.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Proceed to checkout', () => {
  let loginSignUpPage: LoginSignUpPage;
  let mainPage: MainPage;
  let cartPage: CartPage;
  let signUpPage: SignUpPage;
  let productPage: ProductPage;
  let checkoutPage: CheckoutPage;
  let paymentPage: PaymentPage;
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
    checkoutPage = new CheckoutPage(pageWithAdHandler);
    paymentPage = new PaymentPage(pageWithAdHandler);

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

    await productPage.product15.waitFor({ state: 'visible', timeout: 5000 });
    await productPage.product15.click();
    await mainPage.vievCartLink.click();
  });

  test.afterEach(async ({ pageWithAdHandler }) => {
    try {
      await signUpPage.topNavigationBar.deleteAccountLink.click();
      await signUpPage.continueButton.click({ force: true, timeout: 3000 });
    } catch (error) {
      console.log('Delete account cleanup failed:', error);
    }
  });

  test('Proceed to checkout and check my product', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await cartPage.proceedToCheckoutButton.click();

    //Asert
    await expect(cartPage.textLabel).toHaveText(cartPage.checkoutText);
  });

  test('Place order (successfull)', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await cartPage.proceedToCheckoutButton.click();
    await checkoutPage.messageTextarea.fill(checkoutPage.commentToOrder);
    await checkoutPage.placeOrderButton.click();

    await paymentPage.cartData(
      paymentPage.nameOfCard,
      paymentPage.cartNumber,
      paymentPage.cvc,
      paymentPage.expiration,
      paymentPage.expiryYear,
    );

    //Asert
    //await expect(paymentPage.messageSuccessfullyLabel).toHaveText(paymentPage.messageSuccessfulyText);
    await expect(paymentPage.messageCongratulationsLabel).toHaveText(
      paymentPage.messageCongratulationsText,
    );

    //Back to main page
    await paymentPage.continueButton.click();
  });

  test('Place order (unsuccessfull) - Empty name of card', async ({ pageWithAdHandler }) => {
    //Arrange
    const nameOfCardEmpty = '';

    //Act
    await cartPage.proceedToCheckoutButton.click();
    await checkoutPage.placeOrderButton.click();

    await paymentPage.cartData(
      nameOfCardEmpty,
      paymentPage.cartNumber,
      paymentPage.cvc,
      paymentPage.expiration,
      paymentPage.expiryYear,
    );

    //Asert
    await expect(paymentPage.nameOfCardInput).toHaveJSProperty(
      'validationMessage',
      loginSignUpPage.missingMessageBrowser,
    );
  });
/*I should write more tests about empty field but each tests will be this same it will only different name of field.*/
});
