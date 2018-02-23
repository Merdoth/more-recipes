import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @description returns a token
 *
 * @param {Object} payload
 *
 * @returns {object} json - payload
 */
export default (payload) => {
  const secret = process.env.SECRET_KEY;
  const {
    id, fullName, userName, email
  } = payload;

  return jwt.sign({
    id, fullName, userName, email
  }, secret, { expiresIn: 60 * 60 });
};
