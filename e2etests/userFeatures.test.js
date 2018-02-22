module.exports = {
  'Should display sign up and check for available elements': (browser) => {
    browser
      .url('http://localhost:9000')
      .assert.urlEquals('http://localhost:9000/')
      .waitForElementVisible('body')
      .click('#SignUp')
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
      .end();
  }
};
