'use strict'
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
let I;
module.exports = {
    _init() {
        I = actor();
    },
    login()
        I.amOnPage('https://testazure.carvana.com');
        I.click('Sign In', '.my-account');
        I.waitForElement('#EmailAddress', 10);
        I.fillField('#EmailAddress', data.email);
        I.waitForElement('#Password', 10);
        I.fillField('#Password', data.pwd);
        I.click('.button.primary-btn');
    }
}
logout(){
    within('#account-dropdown-btn', () => {
        I.moveCursorTo('.carvana-blue.account-dropdown-txt);
    I.waitForText('Sign out', 20);
    I.click(Sign out);
});
}
}


