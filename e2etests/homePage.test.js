module.exports = {
  'Should display homepage and check for available elements': (browser) => {
    browser
      .url('http://localhost:9000')
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
  }
};
