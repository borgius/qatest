    'use strict';
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
/* My version of creating fake data for forms */
function GenerateName()
{
    var UserName = "";
    var possible = "abcdefjhgklmnoqristvuwxyz";
    for( var i=0; i <= 10; i++ )
        UserName += possible.charAt(Math.floor(Math.random() * possible.length));
    return UserName;
}
function GeneratePassword()
{
    var Password = "";
    var possible = "1234567890qwertyuioasdfghjklzxcvbnm";
    for( var i=0; i <= 9; i++ )
        Password += possible.charAt(Math.floor(Math.random() * possible.length));
    return Password;
}
var firstName = GenerateName();
var lastName = GenerateName();
var email =    GenerateName() + "@gmail.com";
var password = lastName + "1";
/* Scenarios for "windowSize": "maximize" */
Feature('Demo');

Scenario('User can create account', (I) => {
    /*I.amOnPage(data.page);
    I.waitForText('Create Account', 80);*/

    /*User can create account*/
    I.amOnPage('https://goo.gl/6rj684');
    I.waitForElement('.build-a-garage', 30);
    I.click('.build-a-garage', /*'Create Account'*/);
    I.waitForElement('#FirstName');
    I.fillField('#FirstName',firstName);
    I.waitForElement('#LastName');
    I.fillField('#LastName',lastName);
    I.waitForElement('#Email');
    I.fillField('#Email', email);
    I.waitForElement('#Password');
    I.fillField('#Password', lastName + '1');
    I.waitForElement('#ConfirmPassword');
    I.fillField('#ConfirmPassword', lastName + '1');
    I.waitForElement('#createAccountSubmitButton');
    I.click('#createAccountSubmitButton');
    /*User can login*/
    I.amOnPage('https://testazure.carvana.com');
    I.click('Sign In', '.my-account');
    I.waitForElement('#EmailAddress', 10);
    I.fillField('#EmailAddress', email);
    I.waitForElement('#Password', 10);
    I.fillField('#Password', password);
    I.pressKey('Enter');
    /*User can fined VOLKSWAGEN*/
    I.amOnPage('https://testazure.carvana.com');
    I.waitForElement('#text-search-input', 20);
    I.fillField('#text-search-input', 'Volkswagen');
    I.click('.filter-result');
    I.waitForElement('.search-content-container', 20)
    I.wait(10);
    /*User can logout*/
    I.moveCursorTo('#account-dropdown-btn');
    I.waitForText('Sign Out', 20);
    I.click('Sign Out');
  }
);
