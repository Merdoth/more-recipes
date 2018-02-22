module.exports = {
  'Should display homepage and check for available elements': (browser) => {
    browser
      .url('http://localhost:9000')
      // .assert.urlEquals('http://localhost:9000/')
      .waitForElementVisible('body')
      .assert.visible('h5')
      .assert.containsText('h5', 'Your Favorite Recipe\'s At Your Pleasure.')
      // .assert.visible('form')
      // .assert.visible('input[type=text]')
      // .assert.visible('.popular-text')
      // .assert.visible('#no-recipe')
      // .assert.containsText('.popular-text', 'Most recent recipes')
      // .assert.containsText('#no-recipe', 'No recipes available yet')
      .end();
  }
};
