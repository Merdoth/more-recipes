import vote from '../controller/votes';
import votesValidator from '../middleware/votesValidator';

const voteRoutes = (router) => {
  router.post('/votes', votesValidator, vote.upVotes);
  router.get('/recipes?sort=upvotes&order=desc', vote.getAllUpvoted);
};

export default voteRoutes;
