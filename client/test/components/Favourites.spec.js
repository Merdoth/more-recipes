import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedFavourites,
{ Favourites } from '../../components/Favourites.jsx';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = () => {
  const props = {
    favourites: [
      {
        createdAt: '2018-02-20T18:25:54.806Z',
        id: 1,
        recipeId: 1,
        updatedAt: '2018-02-20T18:25:54.806Z',
        userId: 2,
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
    ],
    user: {
      id: 1
    },
    getFavourite: () => { }
  };
  return shallow(<Favourites {...props} />);
};

describe('Favourites Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Connected Favourites component', () => {
  it('tests that the component successfully rendered', () => {
    const { recipe, favourite } = mockData;
    const store = mockStore({
      setCurrentUser: {
        user: [{ id: 1 }]
      },
      recipesReducer: {
        recipesFound: recipe.recipesFound
      },
      favourite: {
        favourite: favourite.favourite
      }
    });
    const wrapper = shallow(<ConnectedFavourites store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

