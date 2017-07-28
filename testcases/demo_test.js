// const faker = require('faker'),
//     _ = require('lodash');

/* Create fake data for forms */
// let rand = faker.internet.password(8, true);
let data = {
  page: 'http://eat24hours.com',
  email : `my_test@hush.com`,
  pwd : 'my_password',
  address: '2222 Pols st, 94109',

  // firstName: faker.name.firstName(),
  // lastName: faker.name.lastName(),
  // emailGetStarted : `b-${rand}@mailinator.com`,
};

/* Scenarios for "windowSize": "maximize" */
Feature('my_demo');

Before((I) => {
  I.amOnPage(data.page)
  I.waitForText('Login', 80)
});

Scenario('Find Restaurant', function*(I) {

  I.click('Login')
  I.fillField('Email', data.email)
  I.fillField('password', data.pwd)
  I.click('#login')

  I.moveCursorTo('#searchTab')
  I.click('Restaurants by City')

  I.fillField('#address', data.address)
  I.click('.submit_button_container')

  // устанавливаем более конкретные фильтры

  I.click('//div[@id="main_filters"]//span//label[text()="Open Now"]')
  I.wait('3')
  // I.click('//div[@id="filter_opt_container"]//div[@class="filter_opt_cells sort_by"]//li//label[text()="Distance"]')
  // I.wait('3')
  // I.click('//div[@id="filter_opt_container"]//div[@class="filter_opt_cells cuisines_with"]//li//label[text()="Pizza"]')
  // I.wait('2')

  var count_of_restaurants = yield I.grabTextFrom('#items_count')
  // console.log('Count = ' + count_of_restaurants);
  if (Number(count_of_restaurants)>0) {
    var min_order_sum = 0

    var str = yield I.grabTextFrom('//div[@class="restaurant_block"][1]//div[@class="content_list_restaurant rest"]//div[@class="content_list_restaurant_left"]//div[@class="info" and contains(text(), "Delivery")]//span')
    if (str.indexOf('$') >=0 ) {
      str = str.replace("$", " ")
      min_order_sum = Number(str)
    }

    I.click('//div[@class="restaurant_block"][1]//div[@class="content_list_restaurant rest"]//div[@class="content_list_restaurant_left"]//div[@class="content_list_viewmenu"]//a')
    var total_sum = 0

    var count_of_items = 0
    let min_count_of_items = 3
    while (count_of_items<min_count_of_items || total_sum<min_order_sum) {
      var i = count_of_items+1
      I.click('//div[@class="section_items"][1]//table['+i+']')
      I.waitForText('Add to Cart', 30)
      I.click('Add to Cart')
      I.wait(2)
      total_sum = yield Number(I.grabTextFrom('//div[@class="cost_summary"]//div[@class="f_clear" and contains(text(), "Subtotal")]//span'))
      console.log(total_sum)
      count_of_items+=1
    }
  }
  I.click('#checkout_btn')
  I.click('//button[@ua-action="Existing Address"]')
  pause()


});
