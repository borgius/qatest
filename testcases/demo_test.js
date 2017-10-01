const faker = require('faker'),
    _ = require('lodash');

/* Create fake data for forms */
let rand = faker.internet.password(8, true);
let data = {
 page: 'https://goo.gl/6rj684',
 pwd : 'qweqwe123',
 firstName: faker.name.firstName(),
 lastName: faker.name.lastName(),
 email : `a-${rand}@mailinator.com`,
 emailGetStarted : `b-${rand}@mailinator.com`,
};

/* Scenarios for "windowSize": "maximize" */
Feature('Demo');

Scenario('User can create account', (I) => {
    I.amOnPage(data.page);
    I.waitForText('Create Account', 80);
    I.click('.build-a-garage');
    I.waitForElement('#FirstName');
    I.fillField('#FirstName',data.firstName);
    I.waitForElement('#LastName');
    I.fillField('#LastName',data.lastName);
    I.waitForElement('#Email');
    I.fillField('#Email', data.email);
    I.waitForElement('#Password');
    I.fillField('#Password', data.pwd);
    I.waitForElement('#ConfirmPassword');
    I.fillField('#ConfirmPassword', data.pwd);
    I.waitForElement('#createAccountSubmitButton', 5);
    I.click('#createAccountSubmitButton');
  }
);
Scenario('User can login/ logout', (I) => {
        //login
    I.amOnPage('https://testazure.carvana.com');
    I.click('Sign In', '.my-account');
    I.waitForElement('#EmailAddress', 10);
    I.fillField('#EmailAddress', 'aaaaaaaaaa@gmail.com');
    I.waitForElement('#Password', 10);
    I.fillField('#Password', 'aaaaaaaaaa1');
    I.pressKey('Enter');
    I.waitForText('WELCOME TO YOUR CARVANA ACCOUNT', 10) //no
        //logout
    I.moveCursorTo('#account-dropdown-btn');
    I.waitForText('Sign Out', 20);
    I.click('Sign Out');
    I.waitForElement('.hp-banner', '.hp-container');
    }
);
