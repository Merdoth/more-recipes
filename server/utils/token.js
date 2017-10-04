import JWT from 'jsonwebtoken';

class Token {
  static getJWT(id, username, email) {
    return JWT.sign({
      id: id
    }, process.env.SECRET, { expiresIn: '24h' });
  }
}

export default Token;