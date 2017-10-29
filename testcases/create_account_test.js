Feature('Registration');

Scenario('Create Account', (I, CreateAccountPage, AccountPage) => {

	CreateAccountPage.openURL()
	var createdAccountName = CreateAccountPage.createRandomAccount()
  AccountPage.checkThatMyNameIs(createdAccountName)

});
