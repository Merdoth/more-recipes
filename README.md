# More-recipes
For the foodies in the house

[![Build Status](https://travis-ci.org/Merdoth/more-recipes.svg?branch=develop)](https://travis-ci.org/Merdoth/more-recipes)

[![Coverage Status](https://coveralls.io/repos/github/Merdoth/more-recipes/badge.svg?branch=feature%2F154840416%2Fvotes)](https://coveralls.io/github/Merdoth/more-recipes?branch=feature%2F154840416%2Fvotes)

[![Maintainability](https://api.codeclimate.com/v1/badges/8848c4753fffea6408dc/maintainability)](https://codeclimate.com/github/Merdoth/more-recipes/maintainability)

# Introduction

More recipes is a web appliaction that allows food lovers to exhibit and explore their ideas towards food, and gets the chance to share with others what they've been able to come across in the course of exploring. 

# Features of More Recipe API

### Authentication

- JSON Web Token (JWT) is used to authenticate users.
- The API creates a token everytime a user logs in.
- The user supplies the token created, before the user can access certain protected endpoints.

### Users 

- New users can sign up.
- Signed up users can login and get an authentication token.
- Users can view their details

### Recipes

- Authenticated users can create recipe.
- Authenticated users can edit/modify their recipe.
- Authenticated users can view all recipe.
- Authenticated users can delete only the recipe they created.

### Review

- Authenticated users can post review for a recipe.
- Authenticated users can view all reviews for a recipe.

### Voting

- Authenticated users can up vote or down vote a recipe.

### Favourite

- Authenticated users can add or remove recipe from their favourite.
- Users will get notification if their favourite recipe get modified.

### Search

- Authenticated users can search for and retrieve any recipes based on the recipe title or ingredients.



# Dependencies


`NodeJS:`is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

`es6(ECMAScript 2015)`: es6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, etc.

`Express`: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

`Postgres`: PostgreSQL is a powerful, open source object-relational database system. It is used to persist dockument API's data.

`Babel`: Babel is used to transpile es6 down to es5.

`Sequelize`: Sequelize is a promise-based Obect Relational Mapper (ORM) for Node.js and io.js.

`Mocha`: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha is the testing framework used to test the API's functionalities.


# For Local setup and testing:
- If you don't have NodeJS already installed go here and install it.
- Clone this repository by running
- `git clone https://github.com/Merdoth/more-recipes.git` on your terminal.
- Navigate into the cloned project directory.
- For example, if you cloned the project into the desktop directory, then run cd desktop which takes you into the desktop, then `cd more-recipes` to enter the project directory.
- Once in the project directory, install all project dependencies by running `npm install`.
- Run the command `npm run start:dev` to start the application.
- To run tests, run the command `npm test`.


# Contributing

Please go through [this](https://github.com/Merdoth/more-recipes/wiki/Contributing) for details on code of conduct, and the process for submitting pull requests to me.
* Fork this repository by clicking the Fork menu item in the top right corner of this repository.
* Go to your github account, and under your repository list, you should find this project listed.
* Open the project, click on the clone or download button, then copy the url that pops up.
* Open your terminal and run the command git clone url where url is the url from the previous step.
* Navigate into the cloned project directory.
* For example, if you cloned the project into the desktop directory, then run cd desktop which takes you into the desktop, then `cd more-recipes` to enter the project directory.
* Once in the project directory, install all project dependencies by running npm install.
* Create your feature branch on your local machine by running `git checkout -b branchName`, where branchName is the name of your feature branch.
* Make your changes.
* Add your changes by running git add filePath, where filePath is path of the file(s) in which the change(s) were made.
* Commit your changes by running `git commit -m "commit message"`.
* Push your changes to your remote branch by running `git push origin branchName`.
* Open a pull request to the staging branch.

# Resources

JSON Web Token (JWT): JWT is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWT is used for secure login.


# Limitations

- Users can only sign in with their email and password.
- Users will be able to access the full application functionalities only if they are signed up

# License
- This project is authored by Chimereucheya Gladys Okereke, and is licensed for use, distribution and modification under the ISC license



