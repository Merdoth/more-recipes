import models from '../models';

const recipes = models.recipes;

class Recipe {
  static add(req, res) {
    const{recipename, ingredients, preparation} = req.body;
    if(!recipename) {
      res.status(400).send({
        message:'Enter Recipe Name'
      });
    } else if(!ingredients) {
      res.status(400).send({
        message:'Enter Ingredients'
      });
    } else if(!preparation) {
      res.status(400).send({
        message:'Enter Preparation Steps'
      });
    } else {
      return recipes
        .create({
          userid: 1, //req.decoded.id,
          recipename: recipename,
          ingredients: [ ingredients ],
          preparation: preparation,
          upvotes: 0,
          downvotes: 0,
        }).then(created => {
          return res.status(200).send(created);
        });
    }
  }

  static get(req, res){
    recipes.all().then(recipes => {
      if(!recipes) {
        return res.status(404).send({ message: 'Recipe not found'});
      }else {
        return res.status(200).send(recipes);
      }
    });
  }
}

export default Recipe;