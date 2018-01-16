import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  authorize(req, res, next) {
    const token = req.headers.authorization || req.body.authorization;
    // req.headers.authorization;
    if (token) {
      // verify token
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          console.log('err', error);
          res.status(400).send({
            message: 'The token you provided is incorrect.'
          });
        } else {
          console.log('nice');
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if no token was provided
      return res.status(401).send({
        status: 401,
        message: 'You did not provide any access token.'
      });
    }
  }
};
