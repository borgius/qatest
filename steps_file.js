'use strict'

let I;
module.exports = {
    _init() {
        I = actor();
    },
    login(){
        I.amOnPage('https://testazure.carvana.com');
        I.click('Sign In', '.my-account');
        I.waitForElement('#EmailAddress', 10);
        I.fillField('#EmailAddress', data.email);
        I.waitForElement('#Password', 10);
        I.fillField('#Password', data.pwd);
        I.click('.button.primary-btn');
    },
logout(){
    within('#account-dropdown-btn', () => {
        I.moveCursorTo('.carvana-blue', '.account-dropdown-txt');
        I.waitForText('Sign out', 20);
        I.click('Sign out');
    });
    }
}
