using OpenQA.Selenium;

using SeleniumTests.PageObjectModels.Selectors;

namespace SeleniumTests.PageObjectModels
{
    internal class ContactUsPage : BasePage
    {
        private const string Url = "https://www.automationexercise.com/contact_us";

        private const string Subject = "Test subject";

        private const string TestMessage = "Test message";

        private readonly IWebDriver _driver;

        internal ContactUsPage(IWebDriver driver)
            : base(driver) => _driver = driver;

        internal void IsLoaded()
        {
            ClosePopupAndEnsurePageIsLoaded(Url);
        }

        internal void TypeContactUsEmail()
        {
            _driver.FindElement(ContactUsSelectors.ContactEmailInput).SendKeys(Email);
        }

        internal void TypeContactUsName()
        {
            _driver.FindElement(ContactUsSelectors.ContactNameInput).SendKeys(UserId);
        }

        internal void TypeContactUsSubcject()
        {
            _driver.FindElement(ContactUsSelectors.ContactSubjectInput).SendKeys(Subject);
        }

        internal void TypeContactUsMessage()
        {
            _driver.FindElement(ContactUsSelectors.ContactYourMessageHereInput).SendKeys(TestMessage);
        }

        internal void ScroolToTheButtonSubmit()
        {
            IJavaScriptExecutor js = (IJavaScriptExecutor)_driver;

            var element = _driver!.FindElement(ContactUsSelectors.ContactButtonSubmit);

            js.ExecuteScript("arguments[0].scrollIntoView();", element);
        }

        internal void ClickSubmitButton()
        {
            WaitUntilElementDisplayed(ContactUsSelectors.ContactButtonSubmit);
            _driver.FindElement(ContactUsSelectors.ContactButtonSubmit).Click();
        }

        internal void ClickAlert()
        {
            _driver.SwitchTo().Alert().Accept();
        }

        internal string GetTextSuccessSendForm()
        {
            return _driver.FindElement(ContactUsSelectors.ContactUsCorrectSendForm).Text;
        }

        internal void ClickHomeButton()
        {
            WaitUntilElementDisplayed(ContactUsSelectors.ContactUsHomeButton);
            _driver.FindElement(ContactUsSelectors.ContactUsHomeButton).Click();
        }

        internal void TypeContactUsIncorrectEmail()
        {
            _driver.FindElement(ContactUsSelectors.ContactEmailInput).SendKeys(IncorrectEmail);
        }
    }
}
