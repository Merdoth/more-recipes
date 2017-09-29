'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var db = [];

db.recipes = [{
  id: 1,
  userId: 1,
  recipeName: 'French Spaghetti',
  ingredient: ['rice', 'beans', 'meat'],
  preparation: 'This is just a dummy that will do you no good, just ask your google',
  upvotes: 50,
  downvotes: 10
}, {
  id: 2,
  userId: 2,
  recipeName: 'French Spaghetti',
  ingredient: ['rice', 'beans', 'meat'],
  preparation: 'This is just a dummy that will do you no good, just ask your google',
  upvotes: 100,
  downvotes: 10
}];

db.review = [];

exports.default = db;