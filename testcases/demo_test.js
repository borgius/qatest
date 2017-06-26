const faker = require('faker');

/* Create fake data for forms */
let rand = faker.internet.password(8, true);
let data = {
 page: 'https://goo.gl/6rj684',
 pwd : 'qweqwe123',
 firstName: faker.name.firstName(),
 lastName: faker.name.lastName(),
 email : `a-${rand}@gmail.com`,
};

/* Scenarios for "windowSize": "maximize" */
Feature('Demo');

/*---------CREATE ACCOUNT----------*/

Scenario('Create account', (I, LogoutPage) => {

	I.amOnPage(data.page);
	I.see('Create Account', '.build-a-garage');
	I.click('Create Account', '.build-a-garage');
	I.fillField('#FirstName', data.firstName);
	I.fillField('#LastName', data.lastName);
	I.fillField('#Email', data.email);
	I.fillField('#Password', data.pwd);
	I.fillField('#ConfirmPassword', data.pwd);
	I.click('Create My Account', '#createAccountSubmitButton');

	//Find My Car

	I.waitForElement('#text-search-input', 30);
	I.seeInTitle('Search | Results');
	I.fillField('#text-search-input', "Volkswagen");
	I.click('.keyword-search-result-selected-row');

	//logout

	LogoutPage.logout();
	
});

/*---------LOGIN AND LOGOUT----------*/

Scenario('Login and logout', (I, LoginPage, LogoutPage) => {

	I.amOnPage(data.page);
	 
	//login

	LoginPage.login();

	I.waitForElement('.account-ribbon-bar-text-desktop', 30);
	I.seeInTitle('My Account');

	//Logout
	
	LogoutPage.logout();

});

/*---------Find My Car----------*/

Scenario('Find My Car', (I) => {

	I.amOnPage(data.page);
	I.waitForElement('#text-search-input', 30);
	I.fillField('#text-search-input', "Volkswagen");
	I.click('.filter-result');
	I.waitForElement('#text-search-input', 30);
	I.seeInTitle('Search | Results');

});