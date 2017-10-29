Feature('Find My Car');

Scenario('Find Volkswagen', (I, SearchPage) => {

	SearchPage.openURL();
	SearchPage.search('Volkswagen');
	SearchPage.seeTag('VOLKSWAGEN');

});
