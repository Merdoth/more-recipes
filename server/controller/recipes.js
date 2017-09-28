class Recipe {
  static test (req, res) {
    res.status(200).send('Hello World');
  }

  static add (req, res) {
    res.status(200).send('Added new route');
  }
}

export default Recipe; 