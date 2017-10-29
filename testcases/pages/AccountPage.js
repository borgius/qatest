
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here

  checkThatMyNameIs(name) {
      I.waitForElement({css: '#account-dropdown-btn > span'}, 10);
      I.see(name+'\'s Account');
  }

}
