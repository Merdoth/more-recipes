let db = [];

db.recipes = [
  {
    id: 1,
    userId: 1,
    recipeName: 'French Spaghetti',
    ingredient: [
      'Spaghetti',
      'Green beans',
      'meat'
    ],
    preparation:'This is just a dummy that will do you no good, just ask your google',
    upvotes: 50,
    downvotes: 10,
  },

  {
    id: 2,
    userId: 2,
    recipeName: 'French Spaghetti',
    ingredient: [
      'Spaghetti',
      'Green beans',
      'meat'
    ],
    preparation:'This is just a dummy that will do you no good, just ask your google',
    upvotes: 100,
    downvotes: 10,
  }
]; 

db.review = [];

export default db;