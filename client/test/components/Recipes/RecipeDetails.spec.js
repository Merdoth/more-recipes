import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { RecipeDetails } from
  '../../../components/Recipes/RecipeDetails.jsx';

/* global jest */

const setup = () => {
  const props = {
    history: {
      push: () => {}
    },
    match: {
      params: () => {}
    },
    recipeIds: [
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
    user: () => {},
    favourites: [],
    reviews: [],
    returnedFavorite: [],
    recipe: () => {},
    addReview: () => jest.fn(),
    upvoteRecipe: () => jest.fn(),
    downVoteRecipe: () => jest.fn(),
    addFavourite: () => jest.fn(),
    removeFavourite: () => jest.fn(),
    getOneRecipe: () => jest.fn(),
    getFavourite: () => jest.fn(),
  };
  return shallow(<RecipeDetails {...props}/>);
};

describe('RecipeDetails Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onSubmit()', () => {
  it('should add review to state', () => {
    const event = {
      preventDefault: jest.fn(),
      addReview: jest.fn()
    };
    const wrapper = setup();
    const button = wrapper.find('.reviewBtn');
    button.simulate('click', event);
  });
});

describe('handleUpVote()', () => {
  it('should add upvote to a recipe', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = setup();
    const button = wrapper.find('.upvote');
    button.simulate('click', event);
  });
});

describe('handledownVote()', () => {
  it('should add downvote to a recipe', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = setup();
    const button = wrapper.find('.downvote');
    button.simulate('click', event);
  });
});

describe('handleFavourite()', () => {
  it('should add or remove favourite to a recipe', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = setup();
    const button = wrapper.find('.favourite');
    button.simulate('click', event);
  });
});

describe('componentWillReceiveProps()', () => {
  it('should call componentWillReceiveProps()', () => {
    const wrapper = setup();
    wrapper.setProps({ recipes: {}, favourites: [] });
    expect(wrapper.state('recipes')).toEqual(undefined);
  });
});

describe('onChange()', () => {
  it('should set reviews to state when input values changes', () => {
    const event = {
      target: { name: 'review', value: '' }
    };
    const wrapper = setup();
    const reviewInput = wrapper.find('.review');

    event.target.value = 'cool meal';
    reviewInput.simulate('change', event);

    expect(wrapper.instance().state.review).toBe('cool meal');
  });
});
