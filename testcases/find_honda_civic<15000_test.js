Feature('Find My Car');

Scenario('find honda civic<$15000', (I) => {

	I.amOnPage('https://testazure.carvana.com/');
	I.click('Find My Car');
	I.wait(10);
	I.fillField({xpath:'//*[@id="text-search-input"]'},'honda civic');
	I.pressKey('Enter');
	I.wait(10);

	I.executeScript(function () {
		var spanCopy = document.querySelector(".rzslider .rz-bar.rz-selection");
		var element = document.createElement("div");
		spanCopy.appendChild(element);
		element.setAttribute("id", "price15000");
		element.setAttribute("style", "display:block; position:absolute; left: 158px; width: 10px; height: 10px; background-color: #ff0000;");
		window.scrollTo(0, 400);
	});
	I.click({xpath: '//*[@id="price15000"]'});
	I.wait(3);

	I.executeScript(function () {
		var element = document.getElementById("price15000");
		element.style.left = "77px";
	});
	I.click({xpath: '//*[@id="price15000"]'});
	I.wait(3);

	I.executeScript(function () {
		var element = document.getElementById("price15000");
		element.style.left = "50px";
	});
	I.click({xpath: '//*[@id="price15000"]'});
	I.wait(3);

	I.executeScript(function () {
		var element = document.getElementById("price15000");
		element.style.left = "33px";
	});
	I.click({xpath: '//*[@id="price15000"]'});
	I.wait(3);

	I.executeScript(function () {
		window.scrollTo(0, 0);
	});

	I.see('HONDA');
	I.see('$1000 - $15000');

});
