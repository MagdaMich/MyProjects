using Common.Selenium;

using SeleniumTests.PageObjectModels;
using SeleniumTests.PageObjectModels.Selectors;

using TechTalk.SpecFlow.Infrastructure;

namespace SeleniumTests.StepDefinitions
{
    [Binding]
    internal class LoginSteps
    {
        private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

        private readonly HomePage _homePage;

        private SignUpLogin _signUpLogin;

        internal LoginSteps(ISpecFlowOutputHelper specFlowOutputHelper, WebDriverProvider webDriverProvider)
        {
            _specFlowOutputHelper = specFlowOutputHelper;
            _homePage = new HomePage(webDriverProvider.Driver);
            _signUpLogin = new SignUpLogin(webDriverProvider.Driver);
        }

        [Given(@"User opens Automation Exercise page")]
        internal void UserOpensAutomationExcercisePage()
        {
            _homePage.NavigateTo();
        }

        [Given(@"User clicks pop up button")]
        internal void UserClicksPopUpButton()
        {
            _homePage.ClickPopUpConsent();
        }

        [When(@"User clicks Signup / Login link")]
        internal void WhenUserClicksSignupLoginLink()
        {
            _signUpLogin = _homePage.ClickLinkLogin();
        }

        [Then(@"User is redirected to the Signup / Login page")]
        internal void UserIsRedirectedToTheSignupLoginPage()
        {
            _signUpLogin.IsLoaded();
        }

        [Then(@"User check user name's")]
        internal void UserCheckUserName()
        {
            _signUpLogin.GetUserIsLogginedInUsText().Should().Be($"Logged in as {BasePage.UserId}");
        }

        [When(@"User fills email and password in login fields")]
        internal void UserFillsEmailAndPasswordInLoginFields()
        {
            _signUpLogin.TypeLoginEmail();
            _signUpLogin.TypeLoginPassword();
        }

        [When(@"User clicks Login button")]
        internal void UserClicksLoginButton()
        {
            _signUpLogin.ClickLoginButton();
        }

        [Then(@"User is redirected to the home page")]
        internal void UserIsRedirectedToTheMainPage()
        {
            _homePage.IsLoaded();
            _homePage.ClickPopUpConsent();
        }

        [When(@"User clicks Logout")]
        internal void UserClicksLogout()
        {
            _homePage.ClickLogout();
        }

        [When(@"User fills incorrect email and correct password in login fields")]
        internal void UserFillsnIncorrectEMailAndCorrectPasswordInLoginFields()
        {
            _signUpLogin.TypeIncorrectEmail();
            _signUpLogin.TypeLoginPassword();
        }

        [When(@"User fills email in login field")]
        internal void UserFillsEmailInLoginField()
        {
            _signUpLogin.TypeLoginEmail();
        }

        [When(@"User fills correct email and incorrect password in login fields")]
        internal void UserFillsCorrectEmailAndIncorrectPasswordInLoginFields()
        {
            _signUpLogin.TypeLoginEmail();
            _signUpLogin.TypeIncorrectPassword();
        }

        [Then(@"User gets message about incorrect email")]
        internal void UserGetsMessageAboutIncorrectEmail()
        {
            Assert.Equivalent(_signUpLogin.GetValidationMessage(SignUpLoginSelectors.LoginEmailInput), BasePage.MessageIncorrectEmail);
        }

        [Then(@"Users gets message about incorrect email or password")]
        internal void UsersGetsMessageAboutIncorrectEmailOrPassword()
        {
            _signUpLogin.GetIncorrectText().Should().Be("Your email or password is incorrect!");
        }

        [Then(@"User gets message about empty field")]
        internal void UserGetsMessageAboutEmptyField()
        {
            Assert.Equivalent(_signUpLogin.GetValidationMessage(SignUpLoginSelectors.LoginPasswordInput), BasePage.MessageEmptyField);
        }

        [When(@"User fills name")]
        internal void UserFillsName()
        {
            _signUpLogin.TypeUserName();
        }

        [When(@"User fills new email")]
        internal void UserFillsNewEmail()
        {
            //string email = $"userExamples123+{DateTime.Now.ToString("yyyyMMddHHmmss.fff")}@gmail.com";
            _signUpLogin.TypeNewEmail();
            //_specFlowOutputHelper.WriteLine($"User email {}");
        }

        [When(@"User clicks Signup button")]
        internal void UserClicksSignupButton()
        {
            _signUpLogin.ClickSignupButton();
        }

        [When(@"User fills incorrect email:(.*)")]
        internal void UserFillsIncorrect(string email)
        {
            _signUpLogin.TypeIncorrectNewEmail(email);
        }

        [Then(@"User gets error (.*)")]
        internal void UserGetsError(string message)
        {
            Assert.Equivalent(_signUpLogin.GetValidationMessage(SignUpLoginSelectors.SignupEmailInput), message);
        }

        [When(@"User fills exist user email")]
        internal void UserFillsExistUserEmail()
        {
            _signUpLogin.TypeUserExistEmail();
        }

        [Then(@"User gets message about exist user")]
        internal void UserGetsMessageAboutExistUser()
        {
            _signUpLogin.GetTextEmailAlreadyExist().Should().Be("Email Address already exist!");
        }

        [Then(@"User gets message fill out this field")]
        internal void UserGetsMessageFillOutThisField()
        {
            Assert.Equivalent(_signUpLogin.GetValidationMessage(SignUpLoginSelectors.NameInput), BasePage.MessageEmptyField);
        }
    }
}
