using Common.Configuration;
using Common.Selenium;
using Common.Specflow;

using TechTalk.SpecFlow.Infrastructure;
using TechTalk.SpecFlow.Tracing;

namespace SeleniumTests.Hooks
{
    [Binding]
    internal class Hook
    {
        private static readonly bool RunOnSeleniumGrid = ConfigurationReader.GetConfiguration()?.Selenium!.RunOnSeleniumGrid == true;

        private static DirectoryInfo? _testDirectory;

        private readonly ISpecFlowOutputHelper _outputHelper;

        private readonly bool _takeScreenshotsAfterStep = ConfigurationReader.GetConfiguration()?.Selenium!.TakeScreenshotsAfterStep == true;

        private readonly bool _takeScreenshotsAfterScenario = ConfigurationReader.GetConfiguration()?.Selenium!.TakeScreenshotsAfterScenario == true;

        private readonly Screenshots _screenshots;

        internal Hook(WebDriverProvider webDriverProvider, ISpecFlowOutputHelper outputHelper)
        {
            _outputHelper = outputHelper;
            _screenshots = new Screenshots(webDriverProvider.Driver);
        }

        [BeforeTestRun]
        internal static void BeforeTestRun()
        {
            if (RunOnSeleniumGrid)
            {
                SeleniumServer.StartServer(AppDomain.CurrentDomain.BaseDirectory);
            }

            _testDirectory = TestArtifactsDirectoryCreator.CreateTestReportDirectory();
        }

        [AfterTestRun]
        internal static void AfterTestRun()
        {
            if (RunOnSeleniumGrid)
            {
                SeleniumServer.StopServer();
            }

            var testAssembly = LivingDocGenerator.GetCallingAssemblyName();
            var reportName = $"Tests_Report.html";

            LivingDocGenerator.GenerateLivingDoc(testAssembly, reportName);
        }

        [AfterStep]
        internal void AfterStep(FeatureContext featureContext, ScenarioContext scenarioContext)
        {
            TakeScreenshots(featureContext, scenarioContext, _takeScreenshotsAfterStep);
        }

        [AfterScenario]
        internal void AfterScenario(FeatureContext featureContext, ScenarioContext scenarioContext)
        {
            TakeScreenshots(featureContext, scenarioContext, _takeScreenshotsAfterScenario);
        }

        private void TakeScreenshots(FeatureContext featureContext, ScenarioContext scenarioContext, bool takeScreenshot)
        {
            if (takeScreenshot)
            {
                var filename = $"{featureContext.FeatureInfo.Title.ToIdentifier()}{scenarioContext.ScenarioInfo.Title.ToIdentifier()}_{DateTime.Now:yyyyMMdd_HHmmssfff}.png";
                _screenshots!.TakeScreenshot(_testDirectory, filename);
                _outputHelper!.AddAttachment($@"..\{TestArtifactsDirectoryCreator.TestReportDirectory}\{filename}");
            }
        }
    }
}
