using OpenQA.Selenium;

namespace Common.Selenium
{
    public sealed class WebDriverProvider : IDisposable
    {
        private static readonly string Browser = Configuration.ConfigurationReader.GetConfiguration()?.Selenium!.Browser!;

        private readonly Lazy<IWebDriver> _driverLazy;

        private bool _isDisposed;

        internal WebDriverProvider()
        {
            _driverLazy = new Lazy<IWebDriver>(CreateDriver!);
        }

        public IWebDriver Driver => _driverLazy.Value;

        public void Dispose()
        {
            if (_isDisposed)
            {
                return;
            }

            if (_driverLazy.IsValueCreated)
            {
                Driver.Quit();
            }

            _isDisposed = true;
        }

        internal IWebDriver? CreateDriver()
        {
            return new WebDriverFactory().GetWeDriver(Browser);
        }
    }
}
