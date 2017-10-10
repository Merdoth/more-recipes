import models from '../models';

const recipes = models.recipes;

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

  static update(req, res) {
    const id = req.params.Id;
    const {recipename,  preparation } = req.body;
    const ingredients = req.body.ingredients.split(',');
    // console.log('hey');
    // console.log(ingredients)
    return recipes.find({
      where: {
        id: id
      }
    }).then((isRecipe) => {
      // console.log(isRecipe)
      if(isRecipe) {
        return isRecipe.update({
          recipename:  recipename , 
          ingredients
        }).then((isRecipe) => {
          // console.log('hahahah');
          return res.status(200).send(isRecipe);
        })
          .catch((error) => {
            console.log('error', error);
          });
      }
    });
  }
}




export default Recipe;