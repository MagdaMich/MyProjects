import { test, expect } from '../fixtures';
import { loginData } from '../test-data/login.data';
import { ContactUs } from '../pages/contactUs.page';
import { EmailGenerator } from '../test-data/emailGenerator';
import { LoginSignUpPage } from '../pages/loginSignUp.page';
import { MainPage } from '../pages/main.page';

test.describe('Contact us page', () => {
  let contactUs: ContactUs;
  let loginSignUp: LoginSignUpPage;
  let mainPage: MainPage;
  let email: string;
  const userId = loginData.userId;

  test.beforeEach(async ({ pageWithAdHandler }) => {
    contactUs = new ContactUs(pageWithAdHandler);
    loginSignUp = new LoginSignUpPage(pageWithAdHandler);
    mainPage = new MainPage(pageWithAdHandler);
    const emailGenerator = new EmailGenerator();
    email = emailGenerator.generateEmail();

    await pageWithAdHandler.goto('/');

    await contactUs.topNavigationBar.contactUsLink.click();
  });

  test('Send message (successful) - Full form', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await contactUs.contactNameInput.fill(userId);
    await contactUs.contactEmailInput.fill(email);
    await contactUs.contactSubjectInput.fill(contactUs.contactSubject);
    await contactUs.contactMessageInput.fill(contactUs.contactMessage);
    await contactUs.submitButton.click();
    await contactUs.alertButton;

    //Asert
    await expect(contactUs.messageLabel).toHaveText(contactUs.messageText);
  });

  test('Send message (unsuccessful) - Empty form', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await contactUs.submitButton.click();

    //Assert
    const validationMessage = await contactUs.contactEmailInput.evaluate((element) => {
      const input = element as HTMLInputElement
      return input.validationMessage
    })
  
    await expect(validationMessage).toContain(loginSignUp.valueMissingMessage)
    
    await expect(contactUs.contactEmailInput).toHaveJSProperty(
      'validationMessage',
      loginSignUp.valueMissingMessage,
    );
  });

  test('Send message (unsuccessful) - Form without email', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await contactUs.contactNameInput.fill(userId);
    await contactUs.contactSubjectInput.fill(contactUs.contactSubject);
    await contactUs.contactMessageInput.fill(contactUs.contactMessage);
    await contactUs.submitButton.click();

    //Assert
    
      // await expect(contactUs.contactEmail).toHaveJSProperty(
      //   'validationMessage',
      //   loginSignUp.valueMissingMessage,
      // );

      const validationMessage = await contactUs.contactEmailInput.evaluate((element) => {
        const input = element as HTMLInputElement
        return input.validationMessage
      })
  
      await expect(validationMessage).toContain(loginSignUp.valueMissingMessage)

  });

  test('Send message (successful) - Form only with email', async ({ pageWithAdHandler }) => {
    //Arrange

    //Act
    await contactUs.contactEmailInput.fill(email);
    await contactUs.submitButton.click();
    await contactUs.alertButton;

    //Asert
    await expect(contactUs.messageLabel).toHaveText(contactUs.messageText);
  });
});

