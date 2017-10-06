Feature('Find My Car');

Scenario('Find Volkswagen', (I) => {

	I.amOnPage('https://testazure.carvana.com/');
	I.click ('Find My Car');
	I.wait(10);
	I.fillField({xpath:'//*[@id="text-search-input"]'},'Volkswagen');
  I.pressKey('Enter');
	I.wait(3);
	I.see('VOLKSWAGEN');

});
