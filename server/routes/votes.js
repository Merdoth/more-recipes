import vote from '../controller/votes';

const voteRoutes = (router) => {
  router.post('/votes', vote.upVotes);
  router.get('/votes', vote.getAllUpvoted);
};

export default voteRoutes;