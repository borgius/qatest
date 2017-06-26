
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here
  form: '#account-login-form',
  fields: {
    email: 'Email',
    password: 'Password'
  },
  submitButton: 'Sign In',
  loginPageUrl: 'https://testazure.carvana.com/account/login',
  loginPageText: 'Hey there, welcome back',
  accountTitle: 'My Account',
  doLogin(email, password) {
    I.say('LoginPage.doLogin');
    I.amOnPage(this.loginPageUrl);

    I.waitForText(this.loginPageText, 30);
    within(this.form, () => {
      I.fillField(this.fields.email,    email);
      I.fillField(this.fields.password, password);
      I.click(this.submitButton);
    });

    I.seeInTitle(this.accountTitle);
  }
}
