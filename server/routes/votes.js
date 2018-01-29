import vote from '../controller/votes';
import auth from '../middleware/authorization';
import votesValidator from '../middleware/votesValidator';

const voteRoutes = (router) => {
  router.post('/votes', auth.authorize, vote.upVotes);
  router.get('/recipes?sort=upvotes&order=desc', vote.getAllUpvoted);
};

export default voteRoutes;
