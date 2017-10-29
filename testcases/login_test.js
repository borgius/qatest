Feature('Entry');

Scenario('Login', (I, LoginPage, AccountPage) => {

	LoginPage.openURL();
	LoginPage.login('clintonb1945@gmail.com', 'h8643lD')
	AccountPage.checkThatMyNameIs('Bill')

});
