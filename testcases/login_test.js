Feature('Login');

Scenario('User can login', (I) => {
    I.amOnPage('https://goo.gl/6rj684');
    I.click('Sign In' , '#nav-upper');
    I.fillField('EmailAddress', 'n4maker@gmail.com'); 
 	I.fillField('Password', 'qwerty12345');
  	I.click('Sign In');
  }
);

