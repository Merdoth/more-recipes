'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, [{
    key: 'add',
    value: function add(req, res) {
      var _req$body = req.body,
          recipeName = _req$body.recipeName,
          ingredients = _req$body.ingredients,
          preparation = _req$body.preparation;

      if (!recipeName) {
        res.status(400).send({
          message: 'Enter Recipe Name'
        });
      } else if (!ingredients) {
        res.status(400).send({
          message: 'Enter Ingredients'
        });
      } else if (!preparation) {
        res.status(400).send({
          message: 'Enter Preparation Steps'
        });
      } else {
        var len = _db2.default.recipes.length;
        var id = 1 + len;

        _db2.default.recipes.push({
          id: id,
          userId: 1,
          recipeName: recipeName,
          ingredients: [ingredients],
          preparation: preparation,
          upvotes: 0,
          downvotes: 0
        });

        return res.status(200).send(_db2.default.recipes[id - 1]);
      }
    }
  }, {
    key: 'get',
    value: function get(req, res) {
      return res.status(200).send(_db2.default.recipes);
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var id = req.params.Id;
      var _req$body2 = req.body,
          recipeName = _req$body2.recipeName,
          ingredients = _req$body2.ingredients,
          preparation = _req$body2.preparation;


      for (var i = 0; i < _db2.default.recipes.length; i++) {
        if (_db2.default.recipes[i].id === parseInt(id, 10)) {
          _db2.default.recipes[i].recipeName = recipeName || _db2.default.recipes[i].recipeName;
          _db2.default.recipes[i].ingredients = ingredients || _db2.default.recipes[i].ingredents;
          _db2.default.recipes[i].preparation = preparation || _db2.default.recipes[i].preparation;

          return res.status(200).send(_db2.default.recipes[i]);
        }
      }

      return res.status(404).send({
        message: 'Recipe Not Found!'
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      for (var i = 0; i < _db2.default.recipes.length; i++) {
        if (_db2.default.recipes[i].id === parseInt(res.params.Id, 10)) {
          _db2.default.recipes.splice(i, 1);
          return res.status(204).send({
            message: 'Recipe has been Deleted'
          });
        }
      }
      return res.status(404).send({
        message: 'Recipe Not Found!'
      });
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;