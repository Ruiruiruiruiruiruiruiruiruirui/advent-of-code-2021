### Ways to test your code.

#### Why do testing?

Have you ever had a scenario where someone is doing up a new feature, checks in their code and breaks something elsewhere in the project? Well, testing will help mitigate that risk, so when your code hits production, there wouldn't be any glaring issues that fall through the cracks while testing.

Wow! That sounds magical doesn't it? Being able to push your code and know it works as intended when it goes live. How is testing done though? We aren't talking about manually going through the system like how it's done in the good 'ol days, we're talking about automated testing.

Essentially, there are 3 main ways to test the code that you've wrote. 

1. E2E, or End to end testing
2. Integration testing
3. Unit testing

Why all these terms? 
The differences between these 3 ways is mostly about coverage of your architecture and the time consumption of writing them. For example, E2E testing is the most laborous of the 3, requiring an entire mock environment on top of the tests that will be written, while unit tests are fairly cheap, testing only small portions of the code.

So now that we know the base differences between the 3 types, let's dive a little bit deeper, starting with...

#### End to end testing

E2E testing is all encompassing tests that are set up to recreate real world scenarios. For example, let's say you have a login page that needs to be tested, how much tests would you have to write for that? 

	 _______________________
	|			|
	|	 ___________	|
	| user: |___________|	|
	|  	 ___________	|
	| pass: |___________|	|
	|			|
	|	 _________	|
	|	|_login_>_|	|
	|_______________________|

Let's break it down: 
- the user will have to input their credentials into the input boxes and click *"login"*
- the UI sends a request to the API to check for credentials
- the API might forward the request to login to a separate authentication service
- the authentication service checks its database for any records of this person and returns the success or failure back to the API
- API sends the response back to the UI
- UI triggers the success or failure of this request

So in our login scenario, you can already tell the scope of the work involved. All the services and databases mentioned will have to be mocked in a separate stable static environment for the tests to run in. Not only that, the tests will have to be written to trigger these requests. 

So get our E2E tests running we would need to:
- set up the environment
- create mock data for our login database
- have a pipeline to deploy these services to our test environment
- create scripts to clear and seed our database with fresh data for each round of testing
- write the test cases for both the success and failure states of the UI

As you can see, that is a lot of work for a simple test to see if login works, this is especially true if your team is really big, some project groups employ a whole team of engineers just to write an maintain tests. But the trade off you get is the peace of mind that your software will work for sure once its been deployed. That is if you've considered all edge cases ;)

Next on our list will be...

#### Integration testing

Integration testing is like a subset of E2E testing, instead of testing the full user flow, we're testing it in smaller chunks so when the project is integrated there will be no issues. 

Let's take a look at our login example again and theorize some integration tests that could be written for it. We can break the entire user login journey into several parts:
- UI submitting the request to the backend API
- API forwards the request to an authentication service
- Auth service checks the database and sends the response back to the backend API
- API sends response back to the UI

As you can see above, each set of tests that can be written is split up into smaller essential building blocks that together make up the user login journey. Another important distinction is the inclusion of 2 or more subsystems that are worked on by different people or teams that needs to be integrated.

This smaller blocks of integrated code could be more easily facilitated and built even if the team is big.

Lastly we have the smallest but arguably the most popular of the 3 types of tests...

#### Unit tests

Unit testing is taking small isolated parts of your project, like utility functions or checking if UI elements are being rendered correctly.

Taking the above user login as an example again, a unit test must be as simple as a function to check if both *"user"* and *"pass"* is filled before allowing the application to make the authentication request. 

A few more examples of unit tests that could be written:
- Whether the UI displays an error message if the authentication request fails
- The backend sends the correct response if the authentication is successful
- Whether the input boxes should have a red outline when the application state demands it

As you can tell, these tests are small and granular and is meant for individuals to write as they're writing their code. To test their own components that they've written. These are the most basic of tests and is the most widely adopted because of the ease of implementation. 

Writing tests will help **improve the stability and reliability of the project**, if your team hasn't implemented some kind of automated testing in some form, it should **really** be considered. Thanks for reading!