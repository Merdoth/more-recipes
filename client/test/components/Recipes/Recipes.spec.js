import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import ConnectedRecipes, { Recipes } from
  '../../../components/Recipes/Recipes.jsx';
import mockData from '../../__mocks__/mockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* global jest */
let props;
const setup = () => {
  props = {
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
    getAllRecipes: () => { },
  };
  return shallow(<Recipes {...props} />);
};
describe('Recipes Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
describe('pageClick()', () => {
  const page = {
    selected: 1
  };
  it('should get the next all recipes', () => {
    const spy = sinon.spy(Recipes.prototype, 'pageClick');
    shallow(<Recipes {...props} pageClick={spy} />)
      .instance().pageClick(page);
  });
});
describe('Connected Recipes component', () => {
  it('tests that the component successfully rendered', () => {
    const { recipes } = mockData;
    const store = mockStore({
      recipesReducer: {
        recipesFound: recipes.recipesFound
      }
    });
    const wrapper = shallow(<ConnectedRecipes store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

