class Recipe {
  static test (req, res) {
    res.status(200).send('Hello World');
  }
}

export default Recipe;