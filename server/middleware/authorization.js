// import modules from dependecies
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  /**
   * @description verifies if a users token is valid
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   * @param { Object } next - callback
   *
   * @returns { Object } json - payload
   */
  authorize(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res.status(401).send({
            message: 'The token you provided is incorrect.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).send({
        status: 401,
        message: 'You did not provide any access token.'
      });
    }
  }
};
