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
Feature('My test');
Scenario('User can create account', (I) => {
        I.amOnPage(data.page);
        I.waitForElement('.build-a-garage', 30);
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
    Scenario('User can login/ logout', (I, steps_file) => {
            //login
        I.amOnPage('https://testazure.carvana.com');
    I.click('Sign In', '.my-account');
    I.waitForElement('#EmailAddress', 10);
    I.fillField('#EmailAddress', email);
    I.waitForElement('#Password', 10);
    I.fillField('#Password', password);
    I.pressKey('Enter');
            //logout
        I.moveCursorTo('#account-dropdown-btn');
        I.waitForText('Sign Out', 20);
        I.click('Sign Out');
        I.waitForText('TO BUY A CAR', 10);
    }
);
    Scenario('User can fined VOLKSWAGEN', (I) => {
        I.amOnPage(data.page);
        I.waitForElement('#text-search-input', 20);
        I.fillField('#text-search-input', 'Volkswagen');
        I.click('.filter-result');
        I.waitForElement('.search-content-container', 20)
    }
);
    Scenario('User can fined HONDA CIVIC <15k', (I) => {
        I.amOnPage(data.page);
    I.waitForText('TO BUY A CAR', 10);
    I.waitForElement('#text-search-input', 20);
    I.fillField('#text-search-input', 'Honda Civic');
    I.click('.filter-result', 'Honda Civic');
    I.waitForElement('.search-content-container', 20); // мы узнаем что результаты появились на страничке
    I.waitForText('Honda Civic', 20); // мы точно будем знать что нам нашло именно Honda Civic
    //функция передвигаюшия слайдер
    I.executeScript(function () {
        var spanCopy = document.querySelector(".rzslider .rz-bar.rz-selection")
        var element =document.createElement("div");
        spanCopy.appendChild(element);
        element.setAttribute("id", "newPlaceForSlider");
        element.setAttribute("style", "display:block; position:absolute; left: 36.75px")
    });
    I.dragAndDrop('.rz-pointer.rz-pointer-max', '#newPlaceForSlider');
    I.waitForText('HONDA CIVIC', 20);
    I.waitForText('$1000 - $15000', 20);
});
