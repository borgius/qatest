Feature('Entry');

Scenario('Login', (I) => {

	I.amOnPage('https://testazure.carvana.com/account/login');
	I.fillField('Email','clintonb1945@gmail.com');
  I.fillField('Password','h8643lD');
	I.click({xpath:'//*[@id="account-login-form"]//input[@type="submit" and @value="Sign In"]'});
	I.wait(5);
	I.see('bill\'s Account');
});
