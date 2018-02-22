const mockData = {
  recipes: {
    id: 1,
    userId: 1,
    recipeName: 'Sweet cake',
    description: 'sweet',
    ingredients: 'floor, sugar, butter, salt',
    preparation: 'Mix and bake',
    image: '/img/toast_qaxxcy.jpg',
    views: 0,
    upVotes: 0,
    downVotes: 0,
    createdAt: '2018-02-13T22:14:54.283Z',
    updatedAt: '2018-02-18T15:23:59.106Z',
    createdRecipe: {
      id: 1,
      userId: 1,
      recipeName: 'Sweet cake',
      description: 'sweet',
      ingredients: 'floor, sugar, butter, salt',
      preparation: 'Mix and bake',
      image: '/img/toast_qaxxcy.jpg',
      views: 0,
      upVotes: 0,
      downVotes: 0,
      createdAt: '2018-02-13T22:14:54.283Z',
      updatedAt: '2018-02-18T15:23:59.106Z',
    },
    updatedRecipe: {
      recipeName: 'beans and fish',
      description: 'this is a mocked data',
      ingredients: 'pepper fish and beans',
      preparation: 'cook and stair',
    },
  },
  recipe: {
    recipesFound: {
      id: 1,
      userId: 1,
      recipeName: 'Sweet cake',
      description: 'sweet',
      ingredients: 'floor, sugar, butter, salt',
      preparation: 'Mix and bake',
      views: 0,
      upVotes: 0,
      downVotes: 0,
      image: '/img/toast_qaxxcy.jpg',
      createdAt: '2018-02-13T22:14:54.283Z',
      updatedAt: '2018-02-18T15:23:59.106Z',
      reviews: [
        {
          id: 1,
          userId: 1,
          recipeId: 1,
          review: 'hello',
          createdAt: '2018-02-14T02:54:43.752Z',
          updatedAt: '2018-02-14T02:54:43.752Z'
        }
      ],
      votes: [
        {
          id: 1,
          userId: 1,
          recipeId: 1,
          voted: 'upVote',
          createdAt: '2018-02-14T01:06:13.896Z',
          updatedAt: '2018-02-14T02:46:43.625Z'
        }
      ]
    }
  },
  recipeState: {
    recipeName: '',
    description: '',
    ingredients: '',
    preparation: 'cook',
  },

  recipeStateSuccess: {
    recipeName: 'Sweet cake',
    description: 'sweet',
    ingredients: 'floor, sugar, butter, salt',
    preparation: 'Mix and bake',
    image: '/img/toast_qaxxcy.jpg',
  },
  favourite: {
    favourite: [
      {
        createdAt: '2018-02-20T18:25:54.806Z',
        id: 1,
        recipeId: 1,
        updatedAt: '2018-02-20T18:25:54.806Z',
        userId: 1,
        recipe: {
          id: 8,
          userId: 3,
          recipeName: 'pepper soup',
          description: 'peppery',
          ingredients: 'yoruba pepper',
          preparation: 'boil',
          views: 1,
          upVotes: 0,
          downVotes: 0,
          image: 'http://res.cloudinary.com/ucheya/image/upload/v1518559934/slow_rxsoi1.jpg',
          createdAt: '2018-02-13T22:12:14.741Z',
          updatedAt: '2018-02-14T19:50:44.721Z',
        }
      }
    ]
  },
  removeFavourite: {
    favourite: undefined
  },
  getFavourite: [{
    createdAt: '2018-02-20T18:25:54.806Z',
    id: 1,
    recipeId: 1,
    updatedAt: '2018-02-20T18:25:54.806Z',
    userId: 1
  }],
  votes: {
    recipe: {
      createdAt: '2018-02-13T22:16:00.845Z',
      description: 'chinese sweet will',
      downVotes: 0,
      id: 11,
      image: '/img/toast_qaxxcy.jpg',
      ingredients: 'pasta tomatoes and curry',
      preparation: 'cook well for 5 min',
      recipeName: 'spagehtti',
      upVotes: 2,
      updatedAt: '2018-02-20T21:08:08.378Z',
      userId: 2,
      views: 7
    }
  }
};
export default mockData;
