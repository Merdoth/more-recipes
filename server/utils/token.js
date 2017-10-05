import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export default (payload) => {
  const secret = env.secret;
  const { id, username, email } = payload;
  return jwt.sign({ id, username, email }, secret, { expiresIn: '24h' });
};