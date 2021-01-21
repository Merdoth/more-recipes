import Votes from '../controller /Votes';
import auth from '../middleware/authorization';

/**
 * @description recipes vote routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const voteRoutes = (router) => {
  router.post('/votes/:id/upvotes', auth.authorize, Votes.upVotes);
  router.post('/votes/:id/downvotes', auth.authorize, Votes.downVotes);
  router.get(
    '/recipes?sort=upvotes&order=desc',
    Votes.getMostVoted
  );
};

export default voteRoutes;
