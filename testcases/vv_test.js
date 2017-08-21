const timeout = 40;
Feature('Search');
Scenario('Find Volkswagen', (I) => {
 
 	//'Find My Car' for Volkswagen
 	
 	I.amOnPage(data.page);
 	I.waitForText('Find My Car', timeout);
 	I.click('Find My Car');
 	I.waitForElement('#text-search-input',timeout);
 	I.click('#text-search-input');
 	I.fillField('#text-search-input', 'Volkswagen');
 	I.pressKey('Enter');
 	}
);