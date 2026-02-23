using OpenQA.Selenium;

using SeleniumTests.PageObjectModels.Selectors;

namespace SeleniumTests.PageObjectModels
{
    internal class HomePage : BasePage
    {
        private const string Url = "https://www.automationexercise.com/";

        private readonly IWebDriver _driver;

        internal HomePage(IWebDriver driver)
            : base(driver) => _driver = driver;

        internal void NavigateTo()
        {
            _driver.Navigate().GoToUrl(Url);
        }

        internal void ClickPopUpConsent()
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
        }

        internal SignUpLogin ClickLogout()
        {
            _driver.FindElement(CommonSelectors.LogoutLink).Click();

            return new SignUpLogin(_driver);
        }

        internal void IsLoaded()
        {
            ClosePopupAndEnsurePageIsLoaded(Url);
        }

        internal void TypeEmailSubscription()
        {
            _driver.FindElement(CommonSelectors.SubscriptionInput).SendKeys(UserEmail);
        }

        internal void ClickSendButton()
        {
            _driver.FindElement(CommonSelectors.SubscriptionSendButton).Click();
        }

        internal void TypeUncorrectEmailSubscription()
        {
            _driver.FindElement(CommonSelectors.SubscriptionInput).SendKeys(IncorrectEmail);
        }
    }
}
