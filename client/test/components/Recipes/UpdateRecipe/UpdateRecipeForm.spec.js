import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { UpdateRecipeForm } from
  '../../../../components/Recipes/UpdateRecipe/UpdateRecipeForm.jsx';

/* global jest */

const setup = () => {
  const props = {
    match: {
      params: () => { }
    },
    user: {
      id: 1
    },
    recipe: () => { },
    message: () => { },
    goToRecipes: () => jest.fn(),
    getOneRecipe: () => { },
    updateRecipe: () => Promise.resolve()
  };
  return shallow(<UpdateRecipeForm {...props} />);
};

describe('UpdateRecipePage Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
});
describe('componentWillReceiveProps()', () => {
  xit('should call componentWillReceiveProps()', () => {
    const wrapper = setup();
    wrapper.setProps({
      recipeName: 'fish pepper soup',
      description: 'cool fool for cool peeps',
      ingredients: 'fish and meat',
      preparation: 'cook for five mins',
      image: 'fish/jpg',
      error: ''
    });
    expect(wrapper.state('recipeName')).toEqual('fish pepper soup');
  });
});
describe('onSubmit()', () => {
  it('should update recipe to the state', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = setup();
    wrapper.setState({
      image: {}
    });
    const button = wrapper.find('#update');
    button.simulate('click', event);
  });
});
describe('onChange()', () => {
  it('should set recipeName to state when input values changes', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'recipeName',
        value: 'cool meal'
      }
    };
    const wrapper = setup();
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.recipeName).toBe('cool meal');
  });
  it('should set image to state when input values changes', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'image',
        files: [{}]
      }
    };
    const wrapper = setup();
    wrapper.instance().onImageChange(event);
  });
});
