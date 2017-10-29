
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here

  openURL() {
    I.amOnPage('https://testazure.carvana.com/');
  	I.click ('Find My Car');
  },

  search(text) {
    I.waitForElement({css: '#text-search-input'}, 100);
    I.fillField({css: '#text-search-input'}, text);
    I.pressKey('Enter');
  },

  seeTag(tagName) {
    I.waitForElement('.tag', 100);
    I.see(tagName, '.tag');
  },

  setMaxPriceTo15000() {
    I.executeScript(function () {
      var spanCopy = document.querySelector(".rzslider .rz-bar.rz-selection");
      var element = document.createElement("div");
      spanCopy.appendChild(element);
      element.setAttribute("id", "price15000");
      element.setAttribute("style", "display:block; position:absolute; left: 158px; width: 10px; height: 10px; background-color: #ff0000;");
      window.scrollTo(0, 400);
    });

    I.click({css: '#price15000'});
    I.wait(3);

    I.executeScript(function () {
      var element = document.getElementById("price15000");
      element.style.left = "77px";
    });
    I.click({css: '#price15000'});
    I.wait(3);

    I.executeScript(function () {
      var element = document.getElementById("price15000");
      element.style.left = "50px";
    });
    I.click({css: '#price15000'});
    I.wait(3);

    I.executeScript(function () {
      var element = document.getElementById("price15000");
      element.style.left = "33px";
    });
    I.click({css: '#price15000'});
    I.wait(3);

    I.executeScript(function () {
      window.scrollTo(0, 0);
    });

    I.wait(3);
  }

}
