import vote from '../controller/votes';
import auth from '../middleware/authorization';

/**
 * @description votes routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
const voteRoutes = (router) => {
  router.post('/votes/:id/upVotes', auth.authorize, vote.upVotes);
  router.post('/votes/:id/downvotes', auth.authorize, vote.downVotes);
  router.get(
    '/recipes?sort=upvotes&order=desc',
    auth.authorize,
    vote.getMostVoted
  );
};

export default voteRoutes;
