'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  var _req$body = req.body,
      recipeName = _req$body.recipeName,
      ingredients = _req$body.ingredients,
      preparation = _req$body.preparation;


  if (!recipeName || recipeName.trim() === '') {
    return res.status(400).send({
      message: 'Please enter a valid recipename!'
    });
  }
  if (!ingredients || ingredients.trim() === '') {
    return res.status(400).send({
      message: 'Please enter valid ingredients!'
    });
  }
  if (!preparation || preparation.trim() === '') {
    return res.status(400).send({ message: 'Please enter valid preparation!' });
  }
  next();
};