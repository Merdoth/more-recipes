import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedRecipeDetailsFooter, { RecipeDetailsFooter } from
  '../../../../components/Recipes/RecipeCard/RecipeDetailsFooter.jsx';
import Button from '../../../../components/common/Button.jsx';

/* global jest swal */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let props;
const swal = jest.fn(() => Promise.resolve());
const setup = () => {
  props = {
    goToRecipes: () => {},

    deleteRecipe: () => jest.fn(() => Promise.resolve()),
  };
  return shallow(<RecipeDetailsFooter {...props} swal={swal}/>);
};

describe('RecipeDetailsFooter Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});


describe('RecipeDetailsFooter Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onSubmit()', () => {
  it('should open the edit page', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = setup();
    const button = wrapper.find('#edit');
    button.simulate('click', event);
  });
});

describe('handleDelete()', () => {
  it('should delete a recipe', () => {
    const event = {
      preventDefault: jest.fn(),
      goToRecipes: jest.fn()
    };
    const wrapper = setup();
    const button = wrapper.find('#delete');
    button.simulate('click', event);
  });
});

describe('Connected RecipeDetailsFooter component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({

    });
    const wrapper = shallow(<ConnectedRecipeDetailsFooter store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

