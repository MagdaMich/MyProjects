import { test, expect } from '../fixtures';
import { BottomNavigation } from '../components/bottomNavigation.components';
import { EmailGenerator } from '../test-data/emailGenerator';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { MainPage } from '../pages/main.page';

test.describe('Subscription', () => {
  let bottomNavigation: BottomNavigation;
  let loginSignUp: LoginSignUpPage;
  let mainPage: MainPage;

  test.beforeEach(async ({ pageWithAdHandler }) => {
    bottomNavigation = new BottomNavigation(pageWithAdHandler);
    loginSignUp = new LoginSignUpPage(pageWithAdHandler);
    mainPage = new MainPage(pageWithAdHandler)

    await pageWithAdHandler.goto('/');
    
  });

  test('Send subscription (successful)', async ({ pageWithAdHandler }) => {
    //Arrange
    const emailGenerator = new EmailGenerator();
    const email = emailGenerator.generateEmail();

    //Act
    await bottomNavigation.subscriptionInput.fill(email);
    await bottomNavigation.sendButton.click();

    //Asert
    await expect(bottomNavigation.messageSentLabel).toHaveText(bottomNavigation.messageSentText);
  });

  test('Send subscription (unsuccessful) - Not full email', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await bottomNavigation.subscriptionInput.fill(loginSignUp.uncorrectEmail);
    await bottomNavigation.sendButton.click();

    //Assert

    await expect(bottomNavigation.subscriptionInput).toHaveJSProperty(
      'validationMessage',
      loginSignUp.typeMismatchMessage,
    );
  });

  test('Send subscription (unsuccessful) - Empty input', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await bottomNavigation.sendButton.click();

    //Assert

    await expect(bottomNavigation.subscriptionInput).toHaveJSProperty(
      'validationMessage',
      loginSignUp.valueMissingMessage,
    );
  });
});
