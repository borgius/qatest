
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here

  openURL() {
    I.amOnPage('https://testazure.carvana.com/account/login');
  },

  login(email, password) {
    I.fillField('Email', email);
    I.fillField('Password', password);
    I.click({css: '#account-login-form > div.login-button-container > input'})
  },

}
