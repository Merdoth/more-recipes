import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (payload) => {
  const secret = process.env.SECRET;
  const { id, username, email } = payload;
  return jwt.sign({ id, username, email }, secret, { expiresIn: '24h' });
};