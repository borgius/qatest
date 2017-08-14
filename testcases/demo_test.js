const faker = require('faker');
const Factory = require('rosie').Factory;
const timeout = 40;
/* Create fake data for forms */

Factory.define('user')
  .attr('page', () => 'https://testazure.carvana.com')
  .attr('firstName', () => faker.name.firstName())
  .attr('lastName', () => faker.name.lastName())
  .attr('email', () => faker.internet.email())
  .attr('zip', () => '85054')
  .attr('pwd', 'qweqwe123');

var data = Factory.build('user');

/* Scenarios for "windowSize": "maximize" */
Feature('Demo');


Scenario('User create account', (I) => {

 	//  Create Account 

    I.amOnPage(data.page);
    I.see ('Create Account');
	I.click('.link-text');
	I.waitForElement('#FirstName', timeout);
	I.click('#FirstName');
	I.fillField('#FirstName', data.firstName);
	I.click('#LastName');
	I.fillField('#LastName', data.lastName);
	I.click('#Email');
	I.fillField('#Email', data.email);
	I.click('#DeliveryZip');
	I.fillField('#DeliveryZip', data.zip);
	I.click('#Password');
	I.fillField('#Password', data.pwd);
	I.click('#ConfirmPassword');
	I.fillField('#ConfirmPassword', data.pwd);
	I.waitForElement('#createAccountSubmitButton', timeout);
	I.click('#createAccountSubmitButton');
	I.waitForText(data.firstName, timeout);
	}
);


Scenario('Login + Logout', (I) => {

	 //  Create Account 

	var data = Factory.build('user');

    I.amOnPage(data.page);
    I.see ('Create Account');
	I.click('.link-text');
	I.waitForElement('#FirstName', timeout);
	I.click('#FirstName');
	I.fillField('#FirstName', data.firstName);
	I.click('#LastName');
	I.fillField('#LastName', data.lastName);
	I.click('#Email');
	I.fillField('#Email', data.email);
	I.click('#DeliveryZip');
	I.fillField('#DeliveryZip', data.zip);
	I.click('#Password');
	I.fillField('#Password', data.pwd);
	I.click('#ConfirmPassword');
	I.fillField('#ConfirmPassword', data.pwd);
	I.waitForElement('#createAccountSubmitButton', timeout);
	I.click('#createAccountSubmitButton');
	I.waitForText(data.firstName, timeout);

	//  Logout

	I.waitForElement('#account-dropdown-btn', timeout);
	I.moveCursorTo('#account-dropdown-btn');
	I.waitForText('Sign Out', timeout);
	I.click('Sign Out');

	//  Login

	I.waitForText('Sign In', timeout);
	I.click('Sign In');
	I.waitForElement('#EmailAddress', timeout);
	I.click('#EmailAddress');
	I.fillField('Email', data.email);
	I.waitForElement('#Password', timeout);
	I.click('#Password');
	I.fillField('Password', data.pwd);
	I.waitForElement('.button.primary-btn', timeout);
	I.click('.button.primary-btn');
	I.waitForText(data.firstName, timeout);
	
	}
);


Scenario('Find Volkswagen', (I) => {

	//'Find My Car' for Volkswagen
	
	I.amOnPage(data.page);
	I.waitForText('Find My Car', timeout);
	I.click('Find My Car');
	I.waitForElement('#text-search-input',timeout);
	I.click('#text-search-input');
	I.fillField('#text-search-input', 'Volkswagen');
	I.pressKey('Enter');
	I.waitForText('PASSAT', timeout);
	}
);

Scenario('Find Honda Civic < $15000', (I) => {

	//'Find My Car' for Honda Civic

	I.amOnPage(data.page);
	I.waitForText('Find My Car', timeout);
	I.click('Find My Car');
	I.waitForElement('#text-search-input',timeout);
	I.click('#text-search-input');
	I.fillField('#text-search-input', 'Honda Civic');
	I.pressKey('Enter');
	I.waitForText('$50,000', timeout);
	I.waitForElement('.rz-bar.rz-selection', timeout); 

	//Create an element to which we will move the cursor.

	I.executeScript(function() {
		var SpanP = document.querySelector(".rzslider .rz-bar.rz-selection");
		var elem1 = document.createElement("div");
		SpanP.appendChild(elem1);
		elem1.setAttribute("id","elem-goto");
		elem1.setAttribute("style", "display:block; position: absolute; left: 36.75px;");
	});
	I.dragAndDrop('.rz-pointer.rz-pointer-max', '#elem-goto');
pause();
	//User can select a vehicle from results

	I.waitForElement(".search-result-tile-image-container", timeout);
	I.click(".search-result-tile-image-container"); 
	I.waitForText("Get Started", timeout);
	
  }
);