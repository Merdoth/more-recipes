import vote from '../controller/votes';

const voteRoutes = (router) => {
  router.post('/votes', vote.upVotes);
  router.get('/recipes?sort=upvotes&order=desc', vote.getAllUpvoted);
};

export default voteRoutes;