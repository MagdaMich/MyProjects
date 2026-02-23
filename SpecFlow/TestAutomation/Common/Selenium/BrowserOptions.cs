using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;

namespace Common.Selenium
{
    internal class BrowserOptions
    {
        internal static void GetChromeOptions(ChromeOptions options)
        {
            options.AddArgument("--disable-backgrounding-occluded-windows");
            options.AddArgument("--lang=en");
            options.AddArgument("--disable-search-engine-choice-screen");
            options.AddArgument("--start-maximized");
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--disable-notifications");
            options.AddArgument("--disable-popup-blocking");
            options.AddArgument("--host-rules=" +
    "MAP *.google-analytics.com 127.0.0.1, " +
    "MAP *.googletagservices.com 127.0.0.1, " +
    "MAP *.googlesyndication.com 127.0.0.1, " +
    "MAP surveys.google.com 127.0.0.1, " +
    "MAP *.googleads.g.doubleclick.net 127.0.0.1, " +
    "MAP *.static.doubleclick.net 127.0.0.1");
            options.AddExcludedArgument("enable-automation");
            options.AddAdditionalOption("useAutomationExtension", false);

            if (Configuration.ConfigurationReader.GetConfiguration()!.Selenium!.Headless)
            {
                options.AddArgument("--headless=new");
                options.AddArgument("--disable-gpu");
                options.AddArgument("window-size=1920,1080");
            }

            options.SetLoggingPreference(LogType.Browser, LogLevel.All);
        }

        internal static void GetEdgeOptions(EdgeOptions options)
        {
            options.AddArgument("--disable-backgrounding-occluded-windows");
            options.AddArgument("--lang=en");
            options.AddExcludedArgument("enable-automation");
            options.AddAdditionalOption("useAutomationExtension", false);

            if (Configuration.ConfigurationReader.GetConfiguration()!.Selenium!.Headless)
            {
                options.AddArgument("--headless");
                options.AddArgument("--disable-gpu");
                options.AddArgument("window-size=1920,1080");
            }
        }

        internal static void GetFirefoxOptions(FirefoxOptions options)
        {
            var profile = new FirefoxProfile();
            profile.SetPreference("intl.accept_languages", "en-US, en");
            profile.SetPreference("intl.locale.requested", "en-US, en");

            if (Configuration.ConfigurationReader.GetConfiguration()!.Selenium!.Headless)
            {
                options.AddArgument("--headless");
                options.AddArguments("--width=1920");
                options.AddArguments("--height=1080");
            }

            options.Profile = profile;
        }
    }
}
