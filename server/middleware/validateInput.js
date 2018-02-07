/**
 * @description validate User Sign In Fields
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
export const signInValidator = (req, res, next) => {
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({
      message: errorObject
    });
  }
  next();
};

/**
 * @description validate add recipe fileds middleware
 *
 * @method
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

export const recipeValidator = (req, res, next) => {
  req.checkBody('recipeName', 'recipename is required').notEmpty();
  req
    .checkBody(
      'recipeName',
      'recipename must at least contain a word without leading space'
    )
    .matches(/^\w[\w\d ,]*\w$/);
  req.checkBody('ingredients', 'ingredients is required').notEmpty();
  req
    .checkBody(
      'ingredients',
      'ingredients must at least contain a word without leading space'
    )
    .matches(/^\w[a-zA-Z0-9 !:;.?+=&%@!\-/,()]*\w$/);
  req.checkBody('preparation', 'preparation is required').notEmpty();
  req
    .checkBody(
      'preparation',
      'preparation must at least contain a word without leading space'
    )
    .matches(/^\w[a-zA-Z0-9 !:;.?+=&%@!\-/,()]*\w$/);

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({ message: errorObject });
  }
  next();
};

/**
 * @description validate user sign up fields middleware
 *
 * @method
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

export const signUpValidator = (req, res, next) => {
  req.checkBody('fullName', 'fullname is required').notEmpty();
  req
    .checkBody(
      'fullName',
      'fullname must be at least 3 characters and not start with an empty space'
    )
    .matches(/^[a-zA-Z]{3,}$/);
  req.checkBody('userName', 'username is required').notEmpty();
  req
    .checkBody(
      'userName',
      'username must be at least 3 characters and not start with an empty space'
    )
    .matches(/^[a-zA-Z]{3,}$/);
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req
    .checkBody(
      'password',
      'Password must be at least 8 characters without space'
    )
    .matches(/[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,32}$/);

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({ message: errorObject });
  }

  next();
};

/**
 * @description validate Params
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

export const validateParams = (req, res, next) => {
  // check if param is of type integer
  // req.sanitizeParams('id', 'Please input a valid id.').toInt();
  // req.checkParams('id', 'Please input a valid id.').isInt();
  // const errors = req.validationErrors();
  // if (errors) {
  //   const errorObject = errors.map(error => error.msg);
  //   return res.status(400).send({ message: errorObject[0] });
  // }
  // next();
};

/**
 * @description validate Review Field
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
export const reviewsValidator = (req, res, next) => {
  // req.checkBody('review', 'review is required').notEmpty();
  // req
  //   .checkBody(
  //     'review',
  //     'review should be at least 5 character long without leading space'
  //   )
  //   .matches(/^\w[a-zA-Z0-9 !:.?+=&%@!]{5,}$/);

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({
      message: errorObject
    });
  }
  next();
};
