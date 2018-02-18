import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import ConnectedUserRecipes, { UserRecipes } from
  '../../../components/Recipes/UserRecipes.jsx';
import mockData from '../../__mocks__/mockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
/* global jest */

const setup = () => {
  const props = {
    recipes: [
      {
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
      }
    ],
    pagination: () => { },
    getUserRecipes: () => { }
  };
  return shallow(<UserRecipes {...props} />);
};

describe('UserRecipes Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Connected UserRecipes component', () => {
  it('tests that the component successfully rendered', () => {
    const { recipes } = mockData;
    const store = mockStore({
      recipesReducer: {
        recipesFound: recipes.recipesFound
      }
    });
    const wrapper = shallow(<ConnectedUserRecipes store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
