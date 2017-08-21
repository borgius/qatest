const timeout = 40
Feature('Create');

Scenario('User can create account', (I) => {
    I.amOnPage('https://goo.gl/6rj684');
    I.click('Create Account' , '#nav-upper');
 	I.fillField('FirstName', 'Mike'); 
 	I.fillField('LastName', 'Shaylskiy');
 	I.fillField('Email', 'n4maker@gmail.com');
 	I.fillField('DeliveryZip', '14215');
 	I.fillField('Password', 'qwerty12345');
 	I.fillField('ConfirmPassword', 'qwerty12345');
 	I.click('Create My Account', '#createAccountSubmitButton' , timeout);
  }
);
