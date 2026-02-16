import { test, expect } from '../fixtures';
import { loginData } from '../test-data/login.data';
import { SignUpPage } from '../pages/signUp.page';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { EmailGenerator } from '../test-data/emailGenerator';
import { MainPage } from '../pages/main.page';

test.describe('User Login page', () => {
  let loginSignUpPage: LoginSignUpPage;
  let signUpPage: SignUpPage;
  let mainPage: MainPage;
  let email: string;
  const userId = loginData.userId;
  const password = loginData.userPassword;

  test.beforeEach(async ({ pageWithAdHandler }) => {
    const emailGenerator = new EmailGenerator();
    email = emailGenerator.generateEmail();
    loginSignUpPage = new LoginSignUpPage(pageWithAdHandler);
    signUpPage = new SignUpPage(pageWithAdHandler);
    mainPage = new MainPage(pageWithAdHandler);

    await pageWithAdHandler.goto('/');

    await loginSignUpPage.topNavigationBar.signupLoginLink.click();
  });

  test('Sign in (successful)', async ({ pageWithAdHandler }) => {
    //Arrange
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
    await loginSignUpPage.topNavigationBar.logoutLink.click();

    const messageLoggedInUs = `Logged in as ${userId}`;

    //Act
    await loginSignUpPage.login(email, password);

    //Assert
    await expect(loginSignUpPage.topNavigationBar.loggedInUsLink).toContainText(
      messageLoggedInUs,
    );

    // clean up after test
    await signUpPage.topNavigationBar.deleteAccountLink.click();
    await signUpPage.continueButton.click();
  });
  
  test('Sign in (unsuccessful) - Uncorrect email', async ({ pageWithAdHandler }) => {
    //Arrange
    const uncorrectEmail = 'user@gmail.com';

    //Act
    await loginSignUpPage.login(uncorrectEmail, password);

    //Assert
    await expect(loginSignUpPage.errorMessage).toHaveText(
      loginSignUpPage.errorMessageText);
  });

  test('Sign in (unsuccessful) - Empty password', async ({ pageWithAdHandler }) => {
    //Arrange
    const emptyPassword = '';

    //Act
    await loginSignUpPage.login(email, emptyPassword);

    //Assert
    await expect(loginSignUpPage.passwordInput).toHaveJSProperty(
      'validationMessage',
      loginSignUpPage.valueMissingMessage,
    );
  });

  test('Sign in (unsuccessful) - Uncorrect password', async ({ pageWithAdHandler }) => {
    //Arrange
    const uncorrectPassword = 'user';

    //Act
    await loginSignUpPage.login(email, uncorrectPassword);

    //Assert
    await expect(loginSignUpPage.errorMessage).toHaveText(
      loginSignUpPage.errorMessageText,
    );
  });
});
