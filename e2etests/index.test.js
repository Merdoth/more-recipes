/*eslint-disable */
module.exports = {
  'Should display homepage and check for available elements': (browser) => {
    browser
      .url('http://localhost:9000/')
      .assert.urlEquals('http://localhost:9000/')
      .waitForElementVisible('body')
      .assert.visible('h5')
      .assert.visible('#brand-name')
      .assert.visible('#search')
      .assert.visible('#Home')
      .assert.visible('#SignUp')
      .assert.visible('#SignIn')
      .assert.visible('#carouselSlides')
      .assert.visible('#slider-one')
      .assert.visible('#title4')
      .assert.visible('#footer')
      .assert
      .containsText('#slider-one', 'Your Favorite Recipe\'s At Your Pleasure.')
      .assert.containsText('#title4', 'Top Recipes')
      .end();
  },
  'Should display sign up and check for available elements': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body')
      .click('#signup')
      .assert.urlEquals('http://localhost:9000/Signup')
      .waitForElementVisible('body')
      .assert.visible('form')
      .assert.visible('h2')
      .assert.visible('input[name=fullName]')
      .assert.visible('input[name=userName]')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('input[name=confirmPassword]')
      .setValue('input[name=fullName]', 'Sarah Gigs')
      .setValue('input[name=userName]', 'Sarah')
      .setValue('input[name=email]', 'sarah.gigs@gmail.com')
      .setValue('input[name=password]', '123456789')
      .setValue('input[name=confirmPassword]', '123456789')
      .waitForElementVisible('.btn.btn-lg.btn-primary.btn-block.signup', 3000)
      .click('.btn.btn-lg.btn-primary.btn-block.signup')
      .pause(5000);
      
  },
  'Should display sign in page and check for available elements': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 10000)
      .click('#signin')
      .assert.urlEquals('http://localhost:9000/Signin')
      .waitForElementVisible('body')
      .assert.visible('form')
      .assert.visible('h2')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .setValue('input[name=email]', 'sarah.gigs@gmail.com')
      .setValue('input[name=password]', '123456789')
      .click('.btn')
      .pause(5000);
  },
  'Should display profile page and check for available elements': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 1000)
      .click('#navbarDropdown')
      .waitForElementVisible('.dropdown-menu', 5000)
      .assert.visible('.dropdown-menu')
      .click('#Profile')
      .assert.urlEquals('http://localhost:9000/profile')
      .waitForElementVisible('body', 3000)
      .assert.visible('h1')
      .assert.visible('input[name=fullName]')
      .assert.visible('input[name=userName]')
      .assert.visible('input[name=email]')
      .clearValue('input[name=fullName]')
      .setValue('input[name=fullName]', ' Bighead')
      .clearValue('input[name=userName]')
      .setValue('input[name=userName]', ' Smile')
      .click('.btn')
      .pause(5000);
  },
  'Should display add recipe page': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 1000)
      .click('#navbarDropdown')
      .waitForElementVisible('.dropdown-menu', 5000)
      .assert.visible('.dropdown-menu')
      .click('#addrecipe')
      .assert.urlEquals('http://localhost:9000/addrecipe')
      .waitForElementVisible('body', 3000)
      .assert.visible('input[name=recipeName]')
      .assert.visible('textarea[name=description]')
      .assert.visible('textarea[name=ingredients]')
      .assert.visible('textarea[name=preparation]')
      .assert.visible('#foodImage')
      .setValue('input[name=recipeName]', 'Egusi')
      .setValue('textarea[name=description]', 'This is an english food')
      .setValue('textarea[name=ingredients]', 'poundo, pepper, azu, upe')
      .setValue('textarea[name=preparation]', 'cook, boil or stem')
      .setValue(
        '#foodImage',
        require('path')
          .resolve(`${__dirname}/../client/assets/image/Salad.jpg`)
      )
      .pause(2000)
      .waitForElementVisible('.btn.btn-lg.btn-primary.btn-block.submitBtn', 10000)
      .pause(2000)
      .assert.visible('.btn.btn-lg.btn-primary.btn-block.submitBtn')

      .click('.btn.btn-lg.btn-primary.btn-block.submitBtn')
      .pause(5000);
  },
  'Should allow a user view all his/her recipes': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 1000)
      .click('#navbarDropdown')
      .waitForElementVisible('.dropdown-menu', 5000)
      .assert.visible('.dropdown-menu')
      .click('#myrecipes')
      .assert.urlEquals('http://localhost:9000/myrecipes')
      .waitForElementVisible('body', 3000)
      .assert.visible('.main-card')
        .click('.main-card')
        .pause(5000)
  },
   'Should allow a user edit his/her recipes': (browser) => {
    browser
      .click('#edit')
      .assert.visible('input[name=recipeName]')
      .assert.visible('textarea[name=description]')
      .assert.visible('textarea[name=ingredients]')
      .assert.visible('textarea[name=preparation]')
      .clearValue('input[name=recipeName]')
      .setValue('input[name=recipeName]', 'owerri Soup')
      .clearValue('textarea[name=description]')
      .setValue('textarea[name=description]', 'This was made BLACK')
      .pause(2000)
      .assert.visible('#update')
      .click('#update')
      .pause(5000)
      .click('.swal-button.swal-button--confirm')
      .pause(5000)
    },
  'Should allow a user favourite his/her recipes': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 3000)
      .click('#navbarDropdown')
      .waitForElementVisible('.dropdown-menu', 5000)
      .assert.visible('.dropdown-menu')
      .click('#allrecipes')
      .assert.urlEquals('http://localhost:9000/recipes')
      .waitForElementVisible('body', 3000)
      .assert.visible('.main-card')
      .click('.main-card')
      .assert.visible('#favourite')
      .click('#favourite')
      .pause(4000)
  },
  'Should allow a user upvote his/her recipes': (browser) => {
    browser
      .waitForElementVisible('body', 3000)
      .assert.visible('#upvote')
      .click('#upvote')
      .pause(4000)
  },
  'Should allow a user downvote his/her recipes': (browser) => {
    browser
      .waitForElementVisible('body', 3000)
      .assert.visible('#downvote')
      .click('#downvote')
      .pause(4000)
  },
    'Should allow a user delete his/her recipes': (browser) => {
      browser
      .waitForElementVisible('#delete')
      .click('#delete')
      .click('.swal-button.swal-button--confirm.swal-button--danger')
      .pause(5000)
  }
};
