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

	LoginPage.login('qwerty@gmail.com', 'qwerty123');

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

/*---------Find My Car for Honda Civic < $15000----------*/

Scenario('Find My Car for Honda Civic < $15000', (I) => {

	I.amOnPage(data.page);
	I.waitForElement('#text-search-input', 30);
	I.fillField('#text-search-input', "Honda Civic");
	I.click('.filter-result');
	I.waitForElement('#text-search-input', 30);
	I.seeInTitle('Search | Results');
	I.executeScript(() => {

		let elem = document.createElement('div');

		elem.style.display = 'block';
		elem.style.position = 'absolute';
		elem.style.left = '36.75px';

		let cildElem = document.getElementsByClassName('rz-selection')[0];

		cildElem.appendChild(elem);

		elem.setAttribute('id', 'newElemPos');

	});
	I.waitForElement('#newElemPos', 30);
	I.dragAndDrop('.rz-pointer-max', '#newElemPos');
	I.seeElement('.rz-pointer-max[aria-valuenow="15000"]');
});