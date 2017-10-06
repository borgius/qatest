Feature('Registration');

Scenario('Create Account', (I) => {
	var d = new Date();
	var seconds = Math.round(d.getTime() / 1000);
	var randomSuffix = Math.floor(Math.random() * 1000);
	var randomEmail = 'test_' + seconds + '_' + randomSuffix + '@gmail.com';

	I.amOnPage('https://testazure.carvana.com/account/create');
	I.fillField('First Name','bill');
	I.fillField('Last Name','clinton');
	I.fillField('Email',randomEmail);
	I.fillField('Zip','12785');
  I.fillField('Password','h8643lD');
	I.fillField('Confirm','h8643lD');
	I.click('Create My Account');
	I.wait(5);
	I.see('bill\'s Account');
});
