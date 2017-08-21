const timeout = 40;
Feature('Login');

Scenario('User can login', (I) => {
    I.amOnPage('https://goo.gl/6rj684');
    I.click('Sign In' , '#nav-upper');
    I.fillField('EmailAddress', 'n4maker@gmail.com'); 
 	I.fillField('Password', 'qwerty12345');
  	I.click('Sign In' , timeout);
  }
);
Scenario('Log out', (I) => {
    I.waitForElement('#account-dropdown-btn', timeout);
 	I.moveCursorTo('#account-dropdown-btn');
 	I.waitForText('Sign Out', timeout);
 	I.click('Sign Out');
  }
);