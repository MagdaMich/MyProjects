using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;

using SeleniumTests.PageObjectModels.Selectors;

namespace SeleniumTests.PageObjectModels
{
    internal class SignUpPage : BasePage
    {
        private const string Url = "https://www.automationexercise.com/signup";

        private const string UrlAccountCreate = "https://www.automationexercise.com/account_created";

        private const string UrlAccountDeleted = "https://www.automationexercise.com/delete_account";

        private const string FirstName = "John";

        private const string LastName = "Rambo";

        private const string Address = "Testowa 2";

        private const string State = "Teksas";

        private const string City = "Oregano";

        private const string Zipcode = "12345";

        private const string MobileNumber = "123456789";

        private readonly IWebDriver _driver;

        internal SignUpPage(IWebDriver driver)
            : base(driver) => _driver = driver;

        internal void IsLoaded()
        {
            ClosePopupAndEnsurePageIsLoaded(Url);
        }

        internal void ScroolOnTheBottomPage()
        {
            Actions actions = new Actions(_driver);

            var element1 = _driver!.FindElement(CommonSelectors.SubscriptionSendButton);

            actions.ScrollToElement(element1);

            actions.Perform();
        }

        internal void ClickButtonCreateAcount()
        {
            _driver.FindElement(SignUpSelectors.CreateAccountButton).Click();
        }

        internal void SelectMr()
        {
            _driver.FindElement(SignUpSelectors.CheckboxMr).Click();
        }

        internal void SelectDay()
        {
            SelectElement selectDay = new SelectElement(_driver.FindElement(SignUpSelectors.DropdownDay));
            selectDay.SelectByValue("16");
        }

        internal void SelectMonth()
        {
            SelectElement selectMonth = new SelectElement(_driver.FindElement(SignUpSelectors.DropdownMonth));
            selectMonth.SelectByValue("4");
        }

        internal void SelectYear()
        {
            SelectElement selectYear = new SelectElement(_driver.FindElement(SignUpSelectors.DropdownYear));
            selectYear.SelectByValue("1994");
        }

        internal void TypePassword()
        {
            _driver.FindElement(SignUpSelectors.PasswordInput).SendKeys(UserPassword);
        }

        internal void TypeFirstName()
        {
            _driver.FindElement(SignUpSelectors.FirstNameInput).SendKeys(FirstName);
        }

        internal void TypeLastName()
        {
            _driver.FindElement(SignUpSelectors.LastNameInput).SendKeys(LastName);
        }

        internal void TypeAddress()
        {
            _driver.FindElement(SignUpSelectors.AddressInput).SendKeys(Address);
        }

        internal void TypeState()
        {
            _driver.FindElement(SignUpSelectors.StateInput).SendKeys(State);
        }

        internal void TypeCity()
        {
            _driver.FindElement(SignUpSelectors.CityInput).SendKeys(City);
        }

        internal void TypeZipcode()
        {
            _driver.FindElement(SignUpSelectors.ZipcodeInput).SendKeys(Zipcode);
        }

        internal void TypeMobileNumber()
        {
            _driver.FindElement(SignUpSelectors.MobileNumberInput).SendKeys(MobileNumber);
        }

        internal void SelectCountry()
        {
            SelectElement selectCountry = new SelectElement(_driver.FindElement(SignUpSelectors.DropdownCountry));
            selectCountry.SelectByValue("United States");
        }

        internal void IsLoadedAccountCreation()
        {
            ClosePopupAndEnsurePageIsLoaded(UrlAccountCreate);
        }

        internal void IsLoadedAccountDeleted()
        {
            ClosePopupAndEnsurePageIsLoaded(UrlAccountDeleted);
        }

        internal void ClickContinueButton()
        {
            _driver.FindElement(SignUpSelectors.ContinueButton).Click();
        }

        internal void ClikDeleteAccountLink()
        {
            WaitUntilElementDisplayed(CommonSelectors.DeleteAccountLink);
            _driver.FindElement(CommonSelectors.DeleteAccountLink).Click();
        }
    }
}
