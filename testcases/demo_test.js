const faker = require('faker');

/* Create fake data for forms */
let rand = faker.internet.password(8, true);
let data = {
 page: 'https://goo.gl/6rj684',
 pwd : 'qweqwe123',
 firstName: faker.name.firstName(),
 lastName: faker.name.lastName(),
 email : `a-${rand}@abc.com`, // NOTE returns `Bad Request` for registrations with `@mailinator.com`
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

    I.waitForElement('#page-content-wrapper', 30); // Wait for page
    I.waitForElement('#suggested-filters-container', 10); // Wait for async loaded filters
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

Scenario('User can Logout', (I, LoginPage) => {
    LoginPage.doLogin(data.email, data.pwd);

    I.amOnPage(data.page);
    I.moveCursorTo('#account-dropdown-btn');
    I.see('Sign Out', '#account-dropdown li a');
    I.click('Sign Out', '#account-dropdown li a');

    I.see('Sign In', 'a');
  }
);

Scenario('User can "Find My Car" for Volkswagen', (I) => {
    // LoginPage.doLogin(data.email, data.pwd); // NOTE is that required?

    I.amOnPage(data.page);
    I.waitForElement('#text-search-input', 30);
    I.fillField('#text-search-input', 'Volkswagen');
    I.see('Volkswagen', '.text-search-results.matching-results-container li.filter-result:nth-child(2) > span'); // assert that first element in section is `Volkswagen`
    I.click('.text-search-results.matching-results-container li.filter-result:nth-child(2)'); // click on it

    I.seeInCurrentUrl('/search');
    I.seeInCurrentUrl('SortBy=MostPopular');
    I.seeInCurrentUrl('isHomepageSearch=true');

    I.waitForElement('#page-content-wrapper', 30); // Wait for page

    I.seeInTitle('Search | Results');

    I.waitForElement('#page-content-wrapper .search-results-unsorted > result-tile .search-result-tile-year', 30);
    I.see('VOLKSWAGEN', '#page-content-wrapper .search-results-unsorted > result-tile .search-result-tile-year');
  }
);

Scenario('User can "Find My Car" for Honda Civic < $15000', function*(I) {
    // LoginPage.doLogin(data.email, data.pwd); // NOTE is that required?

    I.amOnPage(data.page);
    I.waitForElement('#text-search-input', 30);
    I.fillField('#text-search-input', 'Honda Civic');
    I.see('Honda Civic', '.text-search-results.matching-results-container li.filter-result:nth-child(2) > span'); // assert that first element in section is `Honda Civic`
    I.click('.text-search-results.matching-results-container li.filter-result:nth-child(2)'); // click on it

    I.seeInCurrentUrl('/search');
    I.seeInCurrentUrl('SortBy=MostPopular');
    I.seeInCurrentUrl('isHomepageSearch=true');

    I.waitForElement('#page-content-wrapper', 30); // Wait for page

    I.seeInTitle('Search | Results');

    I.waitForElement('#page-content-wrapper .search-results-unsorted > result-tile .search-result-tile-year', 30);
    I.see('HONDA', '#page-content-wrapper .search-results-unsorted > result-tile .search-result-tile-year');
    I.see('CIVIC', '#page-content-wrapper .search-results-unsorted > result-tile .search-result-tile-make-and-model');

    // Mark slider pointer to be possible to locate it; Create div in desired position
    I.executeScript(() => {
      let labels = document.querySelectorAll('#sidebar-wrapper .refine-search-mobile-container .components .search-filter-range-label-header');
      for (let i in labels) {
        let label = labels[i];
        if (label.innerText == 'PRICE') {
          // Mark slider pointer to be possible to locate it
          let priceSliderMaxPointer = label.nextElementSibling.querySelector('.rzslider .rz-pointer-max');
          priceSliderMaxPointer.id = "price-slider-max-pointer";
          // Create div in desired position
          let desiredValue = 15000;
          let slider = label.nextElementSibling.querySelector('.rzslider .rz-bar.rz-selection');
          let sliderWidth = slider.offsetWidth; // 294
          let minValue = parseInt(priceSliderMaxPointer.attributes['aria-valuemin'].value); // 10000
          let maxValue = parseInt(priceSliderMaxPointer.attributes['aria-valuemax'].value); // 50000
          let valueRange = maxValue - minValue;
          desiredValue -= minValue;
          let destPos = sliderWidth * desiredValue / valueRange; // 36.75

          let destPosDiv = document.createElement('div');
          destPosDiv.id = 'price-slider-dest-position';
          slider.appendChild(destPosDiv);
          destPosDiv.style.position = 'absolute';
          destPosDiv.style.left = `${destPos}px`;
          break;
        }
      }
    })
    // I.moveCursorTo('#price-slider-max-pointer');
    I.dragAndDrop('#price-slider-max-pointer', '#price-slider-dest-position');
    I.seeElement('#price-slider-max-pointer[aria-valuenow="15000"]'); // assert that value now is 15k

    // Set sort by higest price
    I.selectOption('.sort-container-desktop select', 'HIGHEST PRICE');

    I.waitForElement('#page-content-wrapper .search-results-unsorted > result-tile .search-result-tile-price', 30);

    let cost = yield I.grabTextFrom('#page-content-wrapper .search-results-unsorted > result-tile:first-child .search-result-tile-price');
    cost = cost.replace('$', '').replace(',','');
    if (cost > 15000) {
      throw 'cost higer that 15k: ' + cost;
    }
  }
);
