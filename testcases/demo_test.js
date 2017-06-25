function GenerateName()
{
    var text = "";
    var possible = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function GeneratePassword()
{
    var text = "";
    var possible = "123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    for( var i=0; i < 9; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function login(I) {

	I.see('Sign In', '.my-account');
	I.click('Sign In', '.my-account');
	I.waitForText('Hey there, welcome back.', 30);
	within('#account-login-form', () => {
	      I.fillField('Email', 'qwerty@gmail.com');
	      I.fillField('Password', 'qwerty123');
	      I.click('Sign In');
	});
}
function logout(I) {

	I.moveCursorTo('#account-dropdown-btn');
	I.waitForVisible('#account-dropdown', 5);
		within('#account-dropdown', () => {
		  I.click('Sign Out', 'li a');
		});
}

var firstName = GenerateName();
var lastName = GenerateName();
var email = GenerateName() + "@gmail.com";
var pass = GeneratePassword() + "1";



Feature('Demo');


Before((I) => {

  I.amOnPage('https://testazure.carvana.com');

});

/*---------CREATE ACCOUNT----------*/

Scenario('Create account', (I) => {

	I.see('Create Account', '.build-a-garage');
	I.click('Create Account', '.build-a-garage');
	I.fillField('#FirstName', firstName);
	I.fillField('#LastName', lastName);
	I.fillField('#Email', email);
	I.fillField('#Password', pass);
	I.fillField('#ConfirmPassword', pass);
	I.click('Create My Account', '#createAccountSubmitButton');

	//Find My Car

	I.waitForElement('#text-search-input', 30);
	I.seeInTitle('Search | Results');
	I.fillField('#text-search-input', "Volkswagen");
	I.click('.keyword-search-result-selected-row');

	//logout

	logout(I);
	
});

/*---------LOGIN AND LOGOUT----------*/

Scenario('Login and logout', (I) => {
	 
	//login

	login(I); 

	I.waitForElement('.account-ribbon-bar-text-desktop', 30);
	I.seeInTitle('My Account');

	//Logout
	
	logout(I);
});

/*---------Find My Car----------*/

Scenario('Find My Car', (I) => {

	I.waitForElement('#text-search-input', 30);
	I.fillField('#text-search-input', "Volkswagen");
	I.click('.filter-result');
	I.waitForElement('#text-search-input', 30);
	I.seeInTitle('Search | Results');

});