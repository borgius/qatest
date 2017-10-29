
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here

  openURL() {
    I.amOnPage('https://testazure.carvana.com/account/create');
  },

  createRandomEmail() {
    var d = new Date();
  	var seconds = Math.round(d.getTime() / 1000);
  	var randomSuffix = Math.floor(Math.random() * 1000);
  	var randomEmail = 'test_' + seconds + '_' + randomSuffix + '@gmail.com';
    return randomEmail;
  },

  createRandomAccount() {
    var name = 'anna'
    I.fillField('First Name', name);
    I.fillField('Last Name', 'clinton');
	  I.fillField('Email', this.createRandomEmail());
    I.fillField('Phone', '1234567890');
    I.fillField('Zip', '12785');
    I.fillField('Password', 'h8643lD');
    I.fillField('Confirm', 'h8643lD');
    I.click('Create My Account');
    return name;
  },

}
