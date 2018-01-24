'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var alreadyReviewed = function alreadyReviewed(req, res, next) {
  var _req$body = req.body,
      userId = _req$body.userId,
      recipeId = _req$body.recipeId,
      review = _req$body.review;


  if (!userId || userId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid userid!' });
  }

  if (!recipeId || recipeId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid recipeid!' });
  }

  if (!review || review.trim() === '') {
    return res.status(400).send({ message: 'Please enter a review!' });
  }
  next();
};

exports.default = alreadyReviewed;