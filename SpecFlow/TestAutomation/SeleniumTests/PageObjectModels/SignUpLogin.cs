using OpenQA.Selenium;

using SeleniumTests.PageObjectModels.Selectors;

namespace SeleniumTests.PageObjectModels
{
    internal class SignUpLogin : BasePage
    {
        private const string Url = "https://www.automationexercise.com/login";

        private readonly IWebDriver _driver;

        internal SignUpLogin(IWebDriver driver)
            : base(driver) => _driver = driver;

        internal void TypeLoginEmail()
        {
            _driver.FindElement(SignUpLoginSelectors.LoginEmailInput).SendKeys(UserEmail);
        }

        internal void TypeLoginPassword()
        {
            _driver.FindElement(SignUpLoginSelectors.LoginPasswordInput).SendKeys(UserPassword);
        }

        internal void ClickLoginButton()
        {
            _driver.FindElement(SignUpLoginSelectors.LoginButton).Click();
        }

        internal void IsLoaded()
        {
            ClosePopupAndEnsurePageIsLoaded(Url);
        }

        internal string GetUserIsLogginedInUsText()
        {
            return _driver.FindElement(CommonSelectors.LoggedInAsLink).Text;
        }

        internal void TypeIncorrectEmail()
        {
            _driver.FindElement(SignUpLoginSelectors.LoginEmailInput).SendKeys(IncorrectEmail);
        }

        internal void TypeIncorrectPassword()
        {
            _driver.FindElement(SignUpLoginSelectors.LoginPasswordInput).SendKeys(IncorrectPassword);
        }

        internal string GetIncorrectText()
        {
            WaitUntilElementDisplayed(SignUpLoginSelectors.ErrorText);
            return _driver.FindElement(SignUpLoginSelectors.ErrorText).Text;
        }

        internal void TypeUserName()
        {
            _driver.FindElement(SignUpLoginSelectors.NameInput).SendKeys(UserName);
        }

        internal void TypeNewEmail()
        {
            _driver.FindElement(SignUpLoginSelectors.SignupEmailInput).SendKeys(Email);
        }

        internal void ClickSignupButton()
        {
            _driver.FindElement(SignUpLoginSelectors.SignupButton).Click();
        }

        internal void TypeIncorrectNewEmail(string email)
        {
            _driver.FindElement(SignUpLoginSelectors.SignupEmailInput).SendKeys(email);
        }

        internal void TypeUserExistEmail()
        {
            _driver.FindElement(SignUpLoginSelectors.SignupEmailInput).SendKeys(UserEmail);
        }

        internal string GetTextEmailAlreadyExist()
        {
            return _driver.FindElement(SignUpLoginSelectors.ErrorText2).Text;
        }
    }
}
