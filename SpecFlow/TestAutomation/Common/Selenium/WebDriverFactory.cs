using Common.Constants;

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;

using WebDriverManager;
using WebDriverManager.DriverConfigs.Impl;
using WebDriverManager.Helpers;

namespace Common.Selenium
{
    internal class WebDriverFactory
    {
        private static readonly bool RunOnSeleniumGrid = Configuration.ConfigurationReader.GetConfiguration()?.Selenium!.RunOnSeleniumGrid == true;

        private static readonly string? SeleniumGridUri = Configuration.ConfigurationReader.GetConfiguration()?.Selenium!.SeleniumGridUri;

        private IWebDriver? _driver;

        internal IWebDriver? GetWeDriver(string browser)
        {
            switch (browser)
            {
                case Browser.Chrome:
                    var chromeOptions = new ChromeOptions();
                    BrowserOptions.GetChromeOptions(chromeOptions);
                    if (RunOnSeleniumGrid)
                    {
                        _driver = new RemoteWebDriver(new Uri(SeleniumGridUri!), chromeOptions);
                    }
                    else
                    {
                        _driver = new ChromeDriver(new DriverManager().SetUpDriver(new ChromeConfig(), VersionResolveStrategy.MatchingBrowser), chromeOptions);
                    }

                    break;
                case Browser.Edge:
                    var edgeOptions = new EdgeOptions();
                    BrowserOptions.GetEdgeOptions(edgeOptions);
                    if (RunOnSeleniumGrid)
                    {
                        _driver = new RemoteWebDriver(new Uri(SeleniumGridUri!), edgeOptions);
                    }
                    else
                    {
                        _driver = new EdgeDriver(new DriverManager().SetUpDriver(new EdgeConfig(), VersionResolveStrategy.MatchingBrowser), edgeOptions);
                    }

                    break;
                case Browser.Firefox:
                    var firefoxOptions = new FirefoxOptions();
                    BrowserOptions.GetFirefoxOptions(firefoxOptions);
                    if (RunOnSeleniumGrid)
                    {
                        _driver = new RemoteWebDriver(new Uri(SeleniumGridUri!), firefoxOptions);
                    }
                    else
                    {
                        _driver = new FirefoxDriver(new DriverManager().SetUpDriver(new FirefoxConfig(), VersionResolveStrategy.MatchingBrowser), firefoxOptions);
                    }

                    break;
            }

            return _driver;
        }
    }
}
