import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedHome, { Home } from '../../components/Home.jsx';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


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
    getMostVoted: () => { }
  };
  return shallow(<Home {...props} />);
};

describe('Home Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should return all recipes', () => {
    const wrapper = setup();
    wrapper.setState({
      recipes: [
        {
          id: 1,
          userId: 1
        }
      ]
    });
  });
});

describe('Connected Home component', () => {
  it('tests that the component successfully rendered', () => {
    const { recipe } = mockData;
    const store = mockStore({
      recipesReducer: {
        recipesFound: recipe.recipesFound
      }
    });
    const wrapper = shallow(<ConnectedHome store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

