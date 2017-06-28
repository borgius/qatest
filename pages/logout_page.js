
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here

logout() {

	I.moveCursorTo('#account-dropdown-btn');
	I.waitForVisible('#account-dropdown', 5);
		within('#account-dropdown', () => {
		  I.click('Sign Out', 'li a');
		});
}

}