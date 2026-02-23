Feature: Login

User can log in with e-mail and password. 

Background: 
	Given User opens Automation Exercise page
	And User clicks pop up button
	When User clicks Signup / Login link 
	Then User is redirected to the Signup / Login page

@smoke
Scenario: Sign in (successful)
	When User fills email and password in login fields
	And User clicks Login button 
	Then User is redirected to the home page
	And User check user name's
	When User clicks Logout
	Then User is redirected to the Signup / Login page

@daily
Scenario: Sign in (unsuccessful) - Incorrect email
	When User fills incorrect email and correct password in login fields
	And User clicks Login button
	Then User gets message about incorrect email

@daily
Scenario: Sign in (unsuccessful) - Empty password
	When User fills email in login field
	And User clicks Login button
	Then User gets message about empty field 

@daily
Scenario: Sign in (unsuccessful) - Incorrect password
	When User fills correct email and incorrect password in login fields
	And User clicks Login button 
	Then Users gets message about incorrect email or password
