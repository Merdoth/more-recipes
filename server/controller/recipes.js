import db from '../models/db';

class Recipe {
  static add(req, res) {
    const{recipeName, ingredients, preparation} = req.body;
    if(!recipeName) {
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
      let len = db.recipes.length;
      const id = 1 + len;
    
      db.recipes.push({
        id: id,
        userId: 1,
        recipeName:recipeName,
        ingredients: [ ingredients ],
        preparation:preparation,
        upvotes: 0,
        downvotes: 0,
      });

      return res.status(200).send(db.recipes[id -1]);
    }
  }

  static get(req, res){
    return res.status(200).send(db.recipes);
  }

  static update(req, res) {
    const id = req.params.Id;
    const {recipeName, ingredients, preparation } = req.body;
    
    for(let i = 0; i < db.recipes.length; i++) {
      if(db.recipes[i].id === parseInt(id, 10)) {
        db.recipes[i].recipeName = recipeName || db.recipes[i].recipeName;
        db.recipes[i].ingredients = ingredients || db.recipes[i].ingredents;
        db.recipes[i].preparation = preparation || db.recipes[i].preparation;

        return res.status(200).send(db.recipes[i]);
      }
    }

    return res.status(404).send({
      message: 'Recipe Not Found!'
    });
  }

  static delete(req, res) {
    for(let i = 0; i < db.recipes.length; i++) {
      if (db.recipes[i].id === parseInt(res.params.Id, 10)){
        db.recipes.splice(i, 1);
        return res.status(204).send({
          message:'Recipe has been Deleted'
        });
      }
    }
    return res.status(404).send({
      message: 'Recipe Not Found!'
    });
  }
}

export default Recipe;