using Common.Selenium;

using SeleniumTests.PageObjectModels;
using SeleniumTests.PageObjectModels.Selectors;

namespace SeleniumTests.StepDefinitions
{
    [Binding]
    internal class SignUpSteps
    {
        private readonly SignUpPage _signUp;

        private readonly HomePage _homePage;

        internal SignUpSteps(WebDriverProvider webDriverProvider)
        {
            _signUp = new SignUpPage(webDriverProvider.Driver);
            _homePage = new HomePage(webDriverProvider.Driver);
        }

        [Then(@"User is redirected to the signup page")]
        internal void UserIsRedirectedToTheSignupPage()
        {
            _signUp.IsLoaded();
        }

        [When(@"User clicks Create Account button")]
        internal void UserClicksCreateAccountButton()
        {
            _signUp.ScroolOnTheBottomPage();
            _signUp.ClickButtonCreateAcount();
        }

        [Then(@"User gets notification about empty field")]
        internal void UserGetsNotificationAboutEmptyField()
        {
            Assert.Equivalent(_signUp.GetValidationMessage(SignUpSelectors.PasswordInput), BasePage.MessageEmptyField);
        }

        [When(@"User selects his / her gender")]
        internal void UserSelectsHisHerGender()
        {
            _signUp.SelectMr();
        }

        [When(@"User selects date of birth")]
        internal void UserSelectsDateOfBirth()
        {
            _signUp.SelectDay();
            _signUp.SelectMonth();
            _signUp.SelectYear();
        }

        [When(@"User fills required fields")]
        internal void UserFillsRequiredFields()
        {
            _signUp.TypePassword();
            _signUp.TypeFirstName();
            _signUp.TypeLastName();
            _signUp.TypeAddress();
            _signUp.SelectCountry();
            _signUp.TypeCity();
            _signUp.TypeState();
            _signUp.TypeZipcode();
            _signUp.TypeMobileNumber();
        }

        [Then(@"User is redirected to the created account page")]
        internal void UserIsRedirectedToTheCreatedAccountPage()
        {
            _signUp.IsLoadedAccountCreation();
        }

        [When(@"User clicks continue button")]
        internal void UserClicksContinueButton()
        {
            _signUp.ClickContinueButton();
        }

        [Then(@"User is redirected to the deleted account page")]
        internal void UserIsRedirectedToTheDeletedAccountPage()
        {
            _signUp.IsLoadedAccountDeleted();
        }

        [When(@"User clicks Delete Account link")]
        internal void UserClicksDeleteAccountLink()
        {
            _homePage.ClickPopUpConsent();
            _signUp.ClikDeleteAccountLink();
        }
    }
}
