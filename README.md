# more-recipes
For the foodies in the house

[![Build Status](https://travis-ci.org/Merdoth/more-recipes.svg?branch=develop)](https://travis-ci.org/Merdoth/more-recipes)
[![Coverage Status](https://coveralls.io/repos/github/Merdoth/more-recipes/badge.svg?branch=develop)](https://coveralls.io/github/Merdoth/more-recipes?branch=develop)



"test": "nyc --reporter=html --reporter=text mocha ./server/tests/ --compilers js:babel-register",
    "coverage": "nyc report --reporter=text-lcov | coveralls",
    "coveralls": "nyc --reporter=lcov --reporter=text-lcov npm test",
    "postinstall": "npm run build",