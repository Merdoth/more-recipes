import JWT from 'jsonwebtoken';

class Token {
  static getJWT(id, username, email) {
    return JWT.sign({
      id: id,
      username: username,
      email: email
    }, process.env.SECRET, { expiresIn: '24h' });
  }
}

export default Token;