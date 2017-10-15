import models from '../models';

const recipes = models.recipes;
const reviews = models.reviews;

class Recipe {
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  static add(req, res) {
    const{recipename, ingredients, preparation} = req.body;
    if (recipename && ingredients && preparation &&
      recipename !== '' && ingredients !== '' && preparation !== ''
    ) {
      return recipes
        .create({
          userid: 1,
          recipename: recipename,
          ingredients: ingredients,
          preparation: preparation,
          upvotes: 0,
          downvotes: 0,
        }).then(recipe => {
          return res.status(200).send(recipe);
        });
    } else {
      res.status(400).send({
        message: 'All fields must be provided!'
      });
    }
  }

  static get(req, res){
    recipes.findAll({
      include: [{ model: reviews }]
    }).then(recipes => {
      if(recipes.length < 1) {
        return res.status(200).send({
          message: 'No recipes found. Please try to create some.'
        });
      }
      if(recipes) {
        return res.status(200).send(recipes);
      }else {
        return res.status(404).send({ message: 'Recipe not found'});
      }
    });
  }

  static update(req, res) {
    const id = req.params.id;
    const {recipename,  preparation, ingredients } = req.body;

    return recipes.find({
      where: {
        id
      }
    }).then((recipe) => {
      if(recipe) {
        return recipe.update({
          recipename: recipename || recipe.recipename, 
          ingredients: ingredients || recipe.ingredients,
          preparation: preparation || recipe.preparation
        })
          .then((updatedRecipe) => {
            return res.status(200).send(updatedRecipe);
          })
          .catch((error) => {
            return res.status(500).send({error});
          });
      } else {
        return res.status(404).send({message: 'Recipe does not exist!'});
      }
    });
  }

  static delete(req, res){
    const id = req.params.id;
    return recipes.find({
      where: {
        id
      }
    }).then((recipe) => {
      if (recipe) {
        recipe
          .destroy()
          .then(() => res.status(200).send({message: 'Recipe deleted!'}));
      } else {
        res.status(404).send({message: 'Recipe does not exist!'});
      }
    })
      .catch(error => {
        return res.status(500).send({error});
      });
  }
}

export default Recipe;