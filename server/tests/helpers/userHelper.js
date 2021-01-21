import jsonwebtoken from 'jsonwebtoken';
import models from '../../models';

const { users } = models;
const userList = [
  {
    fullName: 'glads okey',
    userName: 'glads',
    email: 'cheya99@gmail.com',
    password: '12345678'
  },
  {
    fullName: 'mia fishburn',
    userName: 'miafish',
    email: 'mia99@gmail.com',
    password: '12345678'
  }
];
export const createUser1 = {
  fullName: '',
  userName: 'ucheya',
  email: 'ucheya@gmail.com',
  password: '12345678'
};
export const createUser2 = {
  fullName: 'w',
  userName: 'ucheya',
  email: 'ucheya@gmail.com',
  password: '12345678'
};
export const createUser3 = {
  fullName: 'ucheya okere',
  userName: '',
  email: 'ucheya@gmail.com',
  password: '12345678'
};

export const createUser4 = {
  fullName: 'ucheya okere',
  userName: 'we',
  email: 'ucheya@gmail.com',
  password: '12345678'
};
export const createUser5 = {
  fullName: 'ucheya okere',
  userName: 'ucheya',
  email: '',
  password: '12345678'
};
export const createUser6 = {
  fullName: 'ucheya okere',
  userName: 'ucheya',
  email: 'meooohsdciub',
  password: '12345678'
};
export const userWithNoPassword = {
  fullName: 'ucheya okere',
  userName: 'ucheya',
  email: 'ucheya@gmail.com',
  password: ''
};

export const createdUser = {
  fullName: 'chimereucheya okereke',
  userName: 'ucheya',
  email: 'ucheya@gmail.com',
  password: '12345678'
};

export const createdUser2 = {
  fullName: 'chimucheya okeeke',
  userName: 'cheya',
  email: 'cheya@gmail.com',
  password: '12345678'
};

export const invalidUser = {
  fullName: 'ucheya okere',
  userName: 'ucheya',
  email: 'ucheya@gmail.com',
  password: '1234567'
};

export const fakeUser = {
  email: 'ucheyao@gmail.com',
  password: '12345679'
};

export const userError = {
  email: 'ucheya@gmail.com',
  password: '123456789'
};

export const user1 = {
  email: 'ucheya@gmail.com',
  password: '12345678'
};
export const user2 = {
  email: 'cheya@gmail.com',
  password: '12345678'
};


/**
 * @description Insert seed data in user model
 *
 * @returns {void} Nothing
 */
export const insertUserSeed = () => {
  users.bulkCreate(userList);
};

/**
 * @description Generates token from seed data
 *
 * @param {Number} id - User object
 *
 * @returns {string} token - Generated token
 */
const generateToken = (id) => {
  const { email } = userList[0];
  const { SECRET_KEY } = process.env;
  const token = jsonwebtoken.sign({
    userId: id,
    email,
  }, SECRET_KEY, {
    expiresIn: 86400
  });
  return token;
};

export const user1token = generateToken(1);
export const user2token = generateToken(2);
