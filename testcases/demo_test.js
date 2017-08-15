const faker = require('faker');
const Factory = require('rosie').Factory;
const timeout = 80;
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


Scenario('Create Account + Logout + Login', (I) => {

 	//  Create Account 

    I.amOnPage(data.page);
 	I.waitForText('Create Account', timeout, '.link-text');
 	I.click('.link-text');
	I.waitForElement('#account-create-form', timeout);
	within('#account-create-form', () => {
	   	I.fillField('#FirstName', data.firstName);
	    I.fillField('#LastName', data.lastName);
		I.fillField('#Email', data.email);
		I.fillField('#DeliveryZip', data.zip);
	    I.fillField('#Password', data.pwd);
	    I.fillField('#ConfirmPassword', data.pwd);
	    I.click('#createAccountSubmitButton');
	  });
	 I.waitForText(`${data.firstName}'s Account`, timeout, '.account-dropdown-txt');

	//  Logout

	I.waitForElement('#account-dropdown-btn', timeout);
	I.moveCursorTo('#account-dropdown-btn');
	I.waitForText('Sign Out', timeout, '#account-dropdown');
	I.click('Sign Out');
	
	//  Login

	I.waitForText('Sign In', timeout, '.my-account');
	I.click('Sign In');
	I.waitForElement('#account-login-form', timeout);
	within('#account-login-form', () =>{
		I.fillField('Email', data.email);
		I.fillField('Password', data.pwd);
		I.click('.button.primary-btn');
	 });
	I.waitForText(`${data.firstName}'s Account`, timeout, '.account-dropdown-txt');
	}
);

Scenario('Find Volkswagen', (I) => {

	//'Find My Car' for Volkswagen
	
	I.amOnPage(data.page);
	I.waitForElement('.text-search-input-buffer',timeout);
  	within('.text-search-input-buffer', () => {
  		I.fillField('#text-search-input', 'Volkswagen');
  		I.waitForText('Volkswagen', timeout, '.text-search-results');
  		I.click("//span[contains(text(), 'Volkswagen')]");
	});
	I.waitForText('VOLKSWAGEN', timeout, '.tag');
	}
);

Scenario('Find Honda Civic < $15000', (I) => {

	//'Find My Car' for Honda Civic

	I.amOnPage(data.page);
	I.waitForElement('.text-search-input-buffer',timeout);
  	within('.text-search-input-buffer', () => {
  		I.fillField('#text-search-input', 'Honda Civic');
  		I.waitForText('Honda Civic', timeout, '.text-search-results');
  		I.click("//span[contains(text(), 'Honda Civic')]");
	});
	I.waitForText('$50,000', timeout, '.range-max-value');
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

	//User can select a vehicle from results

	I.waitForElement(".search-result-tile-image-container", timeout);
	I.click(".search-result-tile-image-container"); 
	I.waitForText("Get Started", timeout, '.vdp-header-actions');
  }
);