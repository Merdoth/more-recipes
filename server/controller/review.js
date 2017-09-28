import db from '../models/db';

class Review {
  add(req, res) {
    const { review, userId } = req.body;
    if(!review) {
      res.status(400).send({
        Message: 'Please Enter Review '
      });
    }else {
      let len = db.review.length;
      const id = 1 + len;
      db.review.push({
        id: id,
        userId: userId,
        review: review
      });
      return res.status(200).send(db.review[id-1]);
    }
  }
}

export default Review;