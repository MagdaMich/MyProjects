using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

using SeleniumTests.PageObjectModels.Selectors;

namespace SeleniumTests.PageObjectModels
{
    public abstract class BasePage
    {
        public const string UserEmail = "userExamples123@gmail.com";

        public const string UserPassword = "user123!";

        public const string IncorrectPassword = "user";

        public const string UserId = "newUser";

        public const string UserName = "test";

        public const string IncorrectEmail = "userexamples123";

        public const string IncorrectEmail2 = "@gmail.com";

        public const string MessageIncorrectEmail = $"Please include an '@' in the email address. '{IncorrectEmail}' is missing an '@'.";

        public const string MessageIncorrectPartEmail = $"Please enter a part followed by '@'. '{IncorrectEmail2}' is incomplete.";

        public const string MessageEmptyField = "Please fill out this field.";

        private readonly IWebDriver _driver;

        internal BasePage(IWebDriver driver) => _driver = driver;

        public static string Email => $"userExamples123+{DateTime.Now.ToString("yyyyMMddHHmmss.fff")}@gmail.com";

        internal SignUpLogin ClickLinkLogin()
        {
            _driver.FindElement(CommonSelectors.SignUpLoginLink).Click();

            return new SignUpLogin(_driver);
        }

        internal ContactUsPage ClickLinkContactUs()
        {
            _driver.FindElement(CommonSelectors.ContactUsLink).Click();

            return new ContactUsPage(_driver);
        }

        internal void ClosePopupAndEnsurePageIsLoaded(string url)
        {
            try
            {
                WaitUntilElementDisplayed(HomePageSelectors.PopupConsentButton);
                _driver.FindElement(HomePageSelectors.PopupConsentButton).Click();
            }
            catch
            {
                return;
            }

            if (_driver.Url != url)
            {
                throw new Exception($"Failed to load page. Page URL = '{_driver.Url}'");
            }
        }

        internal string GetValidationMessage(By selector)
        {
            return _driver.FindElement(selector).GetDomProperty("validationMessage");
        }

        protected void WaitUntilElementDisplayed(By selector)
        {
            var wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10))
            {
                PollingInterval = TimeSpan.FromMilliseconds(500),
            };

            wait.Until(d => d.FindElement(selector).Displayed);
        }
    }
}
