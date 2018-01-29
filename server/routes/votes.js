import vote from '../controller/votes';
import auth from '../middleware/authorization';
import votedRecipes from '../middleware/votesValidator';
import { validateParams } from '../middleware/validateInput';

/**
 * @description votes routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
const voteRoutes = (router) => {
  router.post(
    '/upVotes',
    auth.authorize,
    validateParams,
    votedRecipes,
    vote.upVotes
  );
  router.post(
    '/downVotes',
    auth.authorize,
    validateParams,
    votedRecipes,
    vote.downVotes
  );
  router.get(
    '/recipes?sort=upvotes&order=desc',
    auth.authorize, vote.getMostVoted
  );
};

export default voteRoutes;
