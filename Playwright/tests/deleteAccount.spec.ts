import { test, expect } from '../fixtures';
import { loginData } from '../test-data/login.data';
import { SignUpPage } from '../pages/signUp.page';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { EmailGenerator } from '../test-data/emailGenerator';
import { MainPage } from '../pages/main.page';

test.describe('Delete account', () => {
  let loginSignUpPage: LoginSignUpPage;
  let signUpPage: SignUpPage;
  let mainPage: MainPage;
  let email: string;
  const userId = loginData.userId;

  test.beforeEach(async ({ pageWithAdHandler }) => {
    const emailGenerator = new EmailGenerator();
    email = emailGenerator.generateEmail();
    loginSignUpPage = new LoginSignUpPage(pageWithAdHandler);
    signUpPage = new SignUpPage(pageWithAdHandler);
    mainPage = new MainPage(pageWithAdHandler);

    await pageWithAdHandler.goto('/');
    
  });

  test('Delete account (succesfull)', async ({ pageWithAdHandler }) => {
    // Arrange
    const password = loginData.userPassword;

    // Act
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
    await signUpPage.topNavigationBar.deleteAccountLink.click();
    await signUpPage.continueButton.click();
    await signUpPage.topNavigationBar.signupLoginLink.click();
    await loginSignUpPage.login(email, password);

    // Assert
    await expect(loginSignUpPage.errorMessage).toHaveText(
      loginSignUpPage.errorMessageText,
    );
  });
});