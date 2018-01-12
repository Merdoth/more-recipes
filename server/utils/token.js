import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (payload) => {
  const secret = process.env.SECRET_KEY;
  const { id, userName, email } = payload;
  return jwt.sign({ id, userName, email }, secret, { expiresIn: '24h' });
};
