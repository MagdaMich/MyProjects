# Automated Testing Portfolio  
## Magdalena Michalska

Welcome to my Automated Testing Portfolio.

QA Automation Engineer (Junior) with hands-on experience in building UI and API automation frameworks using .NET and TypeScript ecosystems.

This portfolio demonstrates my practical implementation of automated testing architecture, BDD practices, and CI/CD integration.

---

# 🔍 Tested Applications

The automation suites cover real user workflows for:

- https://www.automationexercise.com  
- https://www.saucedemo.com  
- https://reqres.in  

These applications simulate realistic e-commerce and API testing scenarios.

---

# 🛠 Technology Stack

## Programming Languages
- C# (.NET 8)
- TypeScript

## UI Automation
- Playwright (TypeScript)
- Selenium WebDriver (C#)

## API Automation
- RestSharp

## BDD
- SpecFlow / Reqnroll (Gherkin)

## Test Frameworks
- xUnit
- Playwright Test Runner

## Reporting
- Allure Reports
- SpecFlow LivingDoc

## CI/CD
- GitHub Actions (separate pipelines per project)

---

# 📁 Project Overview

## 🔹 UI Automation – automationexercise.com

Implemented using:

- Playwright (TypeScript)
- Selenium (C#)

Key features:

- End-to-End user flows (login, registration, cart, purchase)
- Page Object Model (POM)
- Modular and maintainable test structure
- Comparison of different automation approaches

---

## 🔹 UI Automation – saucedemo.com

Implemented with Selenium + C#.

Frameworks used:

- xUnit
- Reqnroll (BDD)

Key features:

- Gherkin feature files
- Step definitions in C#
- Allure report integration
- CI workflow execution

[![Allure Report](https://img.shields.io/badge/Allure%20Report-View%20Test%20Results-blueviolet?style=for-the-badge&logo=allure)](https://magdamich.github.io/MyProjects/)

---

## 🔹 API Testing – reqres.in

Implemented using:

- RestSharp
- SpecFlow (BDD)

Key features:

- Gherkin-based scenarios
- JSON response validation
- Status code verification
- Automated CI execution

> [!NOTE]
> This repository demonstrates the architecture of API automated tests. Due to recent changes and paywalls introduced by the public API provider (ReqRes.in), the CI/CD pipeline has been moved to the `dev` branch to maintain a clean status on `main`. The code remains a valid showcase of RestSharp and SpecFlow implementation.

---

# 🏗 Architecture & Design Principles

Across the projects I applied:

- Page Object Model (POM)
- Separation of test logic and configuration
- Reusable test utilities
- Clean and scalable test structure
- BDD for business-readable scenarios
- Reporting integrated into CI pipelines

---

# ⚙ CI/CD Integration

Each project contains a dedicated GitHub Actions workflow that:

- Restores dependencies
- Builds the project
- Executes automated tests
- Generates test artifacts and reports
- Fails the pipeline when tests fail

This setup reflects real-world continuous testing practices.

---

# ▶ Running Tests

## 🧪 xUnit / Reqnroll 

Two options to run tests:
- run in the Test Explorer in your IDE
- go to the folder with projects, open the terminal and type: 
`dotnet test`  

Generated allure results will be in test assembly folder, follow the path ...Tests/bin/Debug/net8.0/allure-results. 

Open report: 
- go to the bin folder
- open the terminal and type to generate report: `allure generate` 
- to open the report, type: `allure open`
- for the next report generation, type: `allure generate allure-results --clean` and `allure open`

or 

📊 **Live Allure Report:**  
https://magdamich.github.io/MyProjects/

## 🧪 SpecFlow/ Selenium 

Two options to run tests:
- run in the Test Explorer in your IDE
- go to the folder with projects, open the terminal and type: 
`dotnet test`  

To generate raport with results after tests execution install  **LivingDoc.CLI** on your computer. Type in the terminal to install: 
`dotnet tool install --global SpecFlow.Plus.LivingDoc.CLI`

Generated raport will be in test assembly folder, follow the path .../bin/Debug/net8.0/TestReport  

## 🎭  Playwright

Type following commands in the terminal in IDE

- Initialize Playwright project - requirement is installed Node.js 18+ 
 check `Node.js` version: 
`node -v`

```npm init playwright@latest```

Choose TypeScript. Name of your Tests folder.  Add a GitHub Actions workflow and Install Playwright browsers.

- run tests: ```npx playwright test```
 
- run tests in headed mode: ```npx playwright test --headed```

- view report: ```npx playwright show-raport```  

---

# 🎯 Purpose of the Repository

This repository demonstrates:

- ability to design and implement maintainable automation frameworks
- experience working with both JavaScript and .NET ecosystems
- understanding of end-to-end test architecture
- application of BDD practices in real projects
- integration of automated testing into CI/CD pipelines