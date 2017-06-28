
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here

  login() {
  	I.see('Sign In', '.my-account');
	I.click('Sign In', '.my-account');
	I.waitForText('Hey there, welcome back.', 30);
	within('#account-login-form', () => {
	      I.fillField('Email', 'qwerty@gmail.com');
	      I.fillField('Password', 'qwerty123');
	      I.click('Sign In');
	});
  }

}