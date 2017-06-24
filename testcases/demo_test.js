const faker = require('faker');

/* Create fake data for forms */
let rand = faker.internet.password(8, true);
let data = {
 page: 'https://goo.gl/6rj684',
 pwd : 'qweqwe123',
 firstName: faker.name.firstName(),
 lastName: faker.name.lastName(),
 email : `a-${rand}@abc.com`, // NOTE returns `Bad Request` for registrations with `@mailinator.com`
 // email: 'arst@arstb.com',
 emailGetStarted : `b-${rand}@abc.com`,
};

/* Scenarios for "windowSize": "maximize" */
Feature('Demo');

Scenario('User can create account', (I) => {
    I.amOnPage(data.page);

    I.see('Create Account', '#nav-upper');
    I.click('Create Account', '#nav-upper'); // don't click to mobile menu's `Create Account` link that located above on page

    I.waitForText('Create an account', 30);
    I.fillField('First Name', data.firstName);
    I.fillField('Last Name',  data.lastName);
    I.fillField('Email',      data.email);
    // I.fillField('Zip',        data.); // skipping
    I.fillField('Password',   data.pwd);
    I.fillField('Confirm',    data.pwd);
    I.click('Create My Account');

    I.seeInCurrentUrl('/account/create');

    // Wait for creating account and redirect
    I.wait(10); // bad trick

    I.seeInCurrentUrl('/search');
    I.seeInCurrentUrl('e=ga1welcome');

    // Wait for search results
    I.wait(10); // bad trick

    I.seeInTitle('Search | Results');
  }
);

Scenario('User can Login', (I) => {
    I.amOnPage(data.page);
    I.see('Sign In', '#nav-upper');
    I.click('Sign In', '#nav-upper');

    I.waitForText('Hey there, welcome back', 30);
    within('#account-login-form', () => {
      I.fillField('Email',    data.email);
      I.fillField('Password', data.pwd);
      I.click('Sign In');
    })

    I.seeInTitle('My Account');
  }
);

// of course we also can use this func in prev test, but let leave it as is
function LogIn(I) {
  I.say('Login first');
  I.amOnPage('https://testazure.carvana.com/account/login');

    I.waitForText('Hey there, welcome back', 30);
    within('#account-login-form', () => {
      I.fillField('Email',    data.email);
      I.fillField('Password', data.pwd);
      I.click('Sign In');
    })

    I.seeInTitle('My Account');
}

Scenario('User can Logout', (I) => {
    LogIn(I);

    I.amOnPage(data.page);
    I.click('#account-dropdown-btn');
    I.click('Sign Out', '#account-dropdown li a');

    I.see('Sign In', 'a');
  }
);

Scenario('User can "Find My Car" for Volkswagen', (I) => {
    // LogIn(I); // NOTE is that required?

    I.amOnPage(data.page);
    I.waitForElement('#text-search-input', 30);
    I.fillField('#text-search-input', 'Volkswagen');
    I.see('Volkswagen', '.text-search-results.matching-results-container li.filter-result:nth-child(2) > span'); // assert that first element in section is `Volkswagen`
    I.click('.text-search-results.matching-results-container li.filter-result:nth-child(2)'); // click on it

    I.seeInCurrentUrl('/search');
    I.seeInCurrentUrl('SortBy=MostPopular');
    I.seeInCurrentUrl('models=cpaGgxg7cZaxcBcTaHfj');
    I.seeInCurrentUrl('isHomepageSearch=true');

    // Wait for search results
    I.wait(10); // bad trick

    I.seeInTitle('Search | Results');
  }
);
