using OpenQA.Selenium;

namespace Common.Selenium
{
    public class Screenshots(IWebDriver? driver)
    {
        private readonly IWebDriver? _driver = driver;

        public void TakeScreenshot(DirectoryInfo? directory, string fileName)
        {
            var screenshot = ((ITakesScreenshot)_driver!).GetScreenshot();

            screenshot.SaveAsFile($"{directory}//{fileName}");
        }
    }
}
