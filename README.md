## Repository Magdelena Michalska
This repository present automated tests for website:

> https://www.automationexercise.com. 

 I used different testing frameworks, like **Playwright**, **Cypress**, **Selenium** and **Specflow** and using two programming languages **C#(.NET 8)** and **Typescript**. To write tests in Playwright and Cypress, I used  **Visual Studio Code** and to write test based on Specflow, I worked with **Visual Studio 2022**

> https://www.saucedemo.com

The project includes both **xUnit** and **Reqnroll** (BDD) tests written in **C#** with **Selenium**.
Test reports are generated using Allure, but only for Reqnroll scenarios. 

[![Allure Report](https://img.shields.io/badge/Allure%20Report-View%20Test%20Results-blueviolet?style=for-the-badge&logo=allure)](https://magdamich.github.io/MyProjects/)
> https://reqres.in/

The repository contains API tests implemented in **RestSharp**  with **SpecFlow** using the public API on the page (Currently, the workflow for RestSharp has failed because the reqres.in website has changed, and I’m working on updating those tests)

Each project in this repository has its own dedicated GitHub Actions pipeline.

## How to run tests in frameworks:

### xUnit / Reqnroll 

Two options to run tests:
- run in the Test Explorer in your IDE
- go to the folder with projects, open the terminal and type: 
`dotnet test`  

Generated allure results will be in test assembly folder, follow the path ...Tests/bin/Debug/net8.0/allure-results. 

Open raport: 
- go to the bin folder
- open the terminal and type to generate report: `allure generate` 
- to open the report, type: `allure open`
- for the next report generation, type: `allure generate allure-results --clean` and `allure open`   

### SpecFlow/ Selenium 

Two options to run tests:
- run in the Test Explorer in your IDE
- go to the folder with projects, open the terminal and type: 
`dotnet test`  

To generate raport with results after tests execution install  **LivingDoc.CLI** on your computer. Type in the terminal to install: 
`dotnet tool install --global SpecFlow.Plus.LivingDoc.CLI`

Generated raport will be in test assembly folder, follow the path .../bin/Debug/net8.0/TestReport  

### Playwright

Type following commands in the terminal in IDE

- Installing new project in Playwright - requirement is installed Node.js 18+ 
 check `NodeJS` version: 
`node -v`

```npm init playwright@latest```

Choose TypeScript. Name of your Tests folder.  Add a GitHub Actions workflow and Install Playwright browsers.

- run tests
 ```npx playwright test```
 
- run tests in headed
```npx playwright test --headed```

- raport with tests
```npx playwright show-raport```  

### Cypress 

 Type fallowing commands in the terminal in IDE
 
- install new project Cypress
```npm install cypress --save-dev```

- run tests 
`npx cypress run`
