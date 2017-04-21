const faker = require('faker'),
    _ = require('lodash');

/* Create fake data for forms */
let rand = faker.internet.password(8, true);
let data = {
 page: 'https://goo.gl/6rj684',
 pwd : 'qweqwe123',
 firstName: faker.name.firstName(),
 lastName: faker.name.lastName(),
 email : `carnivale2e-a-${rand}@gmail.com`,
 emailGetStarted : `carnivale2e-b-${rand}@gmail.com`,
};

/* Scenarios for "windowSize": "maximize" */
Feature('Demo');

Scenario('User can create account', (I) => {
    I.amOnPage(data.page);
    I.waitForText('Create Account', 80);
    I.click('.link-text');
    within('#account-create-form', () => {
      I.fillField('FirstName', data.firstName );
      I.fillField('LastName', data.lastName );
      I.fillField('Email', data.email );
      I.fillField('Password', data.pwd );
      I.fillField('ConfirmPassword', data.pwd );
      I.click('Create My Account');
    });
    I.waitForText(data.firstName + "'s Account", 80);
  }
);


Scenario('User can login and logout', (I) => {
    I.amOnPage(data.page);
    I.waitForText('Sign In', 80);
    I.click('.my-account');
    within('#account-login-form' , () => {
      I.fillField('Email', data.email );
      I.fillField('Password', data.pwd );
      I.click('Sign In');
    });
    I.waitForText(data.firstName + "'s Account", 80);
    I.click('.account-dropdown-txt');
    I.waitForText('Sign Out', 80);
    I.click('Sign Out');
    I.waitForText('Sign In', 80);
  }
);

Scenario('User can Find My Car for Volkswagen', (I) => {
    I.amOnPage(data.page);
    I.waitForText('HOW IT WORKS', 80);
    within('.text-search-input-buffer' , () => {
      I.appendField('.text-search-input', 'volkswagen');
      I.click('.bold-phrase');
    });
    I.waitForText('VOLKSWAGEN', 80);
  }
);
Scenario('User can Find My Car for Honda Civic < $15000', (I) => {      
    I.amOnPage(data.page);
    I.clearCookie();
    I.waitForText('HOW IT WORKS');
    I.click(".//*[@id='hp-price-ranges']/div[2]/div/ul/li[1]/div");
    I.waitForText('APPLY FILTER', 80);
    I.click(".hp-apply-filters");
    I.waitForText('$0 - $15000', 80);
    within("#sidebar-wrapper" , () => {
      I.waitForElement(".search-input", 80);
      I.fillField(".search-input", 'honda civic');
      I.waitForElement(".search-result-bold-phrase", 80);
      I.click('.search-result-bold-phrase');
    });    
    I.waitForText('$0 - $15000', 80);  
    I.waitForText('HONDA CIVIC', 80);
  }
);


Scenario('User can select a vehicle from results', (I) => {
    I.amOnPage(data.page);
    I.clearCookie();
    I.waitForText('HOW IT WORKS');
    I.click('Find My Car');
    I.waitForText('Website Terms of Use and Privacy Policy', 80);
    I.waitForElement(".//result-tile[1]/div/div[1]/a/img", 80);
    I.click(".//result-tile[1]/div/div[1]/a/img");
    I.waitForText('More Cars You Might Like', 80); 
  }
);


Scenario('User can get started, land in purchase process from given vehicle page, logout, login and continue where they left off ', (I) => {
    I.amOnPage(data.page);
    I.clearCookie();
    I.waitForText('HOW IT WORKS');
    I.click('Find My Car');
    I.waitForText('Website Terms of Use and Privacy Policy', 80);
    I.waitForElement(".//result-tile[1]/div/div[1]/a/img", 80);
    I.click(".//result-tile[1]/div/div[1]/a/img");
    I.waitForText('More Cars You Might Like', 80); 
    I.waitForText('Get Started', 80);
    I.waitForElement(".//*[@id='vdp-header']/div[5]/div[2]/div[1]/div[1]/div", 80);
    I.click(".//*[@id='vdp-header']/div[5]/div[2]/div[1]/div[1]/div"); //Get Started
    I.waitForText('EVERY CARVANA CAR', 80);
    I.click(".//*[@id='viewporter-wrapper']/div/div[3]/div/div/div/div/div/div/div/div/div/div/proposition/div/div/button"); //Let's Get Started
    I.waitForText('WELCOME', 80);
    I.click('New user? create account');
    I.waitForText('Create an account so we can hold this car for you!', 80);
    within('.purchase-account-create-form', () => {
      I.fillField('emailAddress', data.emailGetStarted );
      I.fillField('password', data.pwd );
      I.click('Create My Account');
    });
    I.waitForText('SUMMARY', 80);
    I.click('.purchase-desktop-tutorial-bubble-description');
    I.waitForText('PERSONAL INFORMATION', 80);
    I.click('.purchase-desktop-header-menu-button');
    I.waitForText('Sign Out', 80);
    I.click('Sign Out');
    I.waitForText('WELCOME', 80);
    I.click('Returning user? sign in');
    within('.purchase-account-sign-in-form', () => {
      I.fillField('emailAddress', data.emailGetStarted );
      I.fillField('password', data.pwd );
      I.click('Sign In');
    });
    I.waitForText('PERSONAL INFORMATION', 80);
  }
);
