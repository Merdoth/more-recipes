import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  authorize(req, res, next) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJEYW50ZSBXZXN0IiwiZW1haWwiOiJsb3Vpc2RhbnRlOUBnbWFpbC5jb20iLCJpYXQiOjE1MTU4OTgwODQsImV4cCI6MTUxNTk4NDQ4NH0.bi2Zm41xizRZloW_5pGTP4iGI_Dx6TkOY5vA-owTOTo';
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
