Feature('Find My Car');

Scenario('find honda civic<$15000', (I, SearchPage) => {

	SearchPage.openURL();
	SearchPage.search('honda civic');

	I.wait(3);

	SearchPage.setMaxPriceTo15000();

	SearchPage.seeTag('HONDA CIVIC');
	SearchPage.seeTag('- $15000');
});
