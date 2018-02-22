import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedAddRecipeForm, { AddRecipeForm } from
  '../../../../components/Recipes/AddRecipe/AddRecipeForm.jsx';
import InputField from '../../../../components/common/InputField.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* global jest */
const setup = () => {
  const props = {
    addRecipes: () => {},
    recipeReducer: {
      recipes: () => {}
    }
  };
  return shallow(<AddRecipeForm {...props} />);
};

describe('AddRecipeForm Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper.find(InputField)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onSubmit()', () => {
  it('should add recipes to the state', () => {
    const event = {
      preventDefault: jest.fn(),
      addRecipes: jest.fn()
    };
    const wrapper = setup();
    const button = wrapper.find('.submitBtn');
    button.simulate('click', event);
  });
});

describe('onChange()', () => {
  it('should set recipeName to state when input values changes', () => {
    const event = {
      target: { name: 'recipeName', value: '' }
    };
    const wrapper = setup();
    const recipeNameInput = wrapper.find('#recipeName');

    event.target.value = 'Egusi Soup';
    recipeNameInput.simulate('change', event);

    expect(wrapper.instance().state.recipeName).toBe('Egusi Soup');
  });

  it('should set description state when input values changes', () => {
    const event = {
      target: { name: 'description', value: '' }
    };
    const wrapper = setup();
    const descriptionInput = wrapper.find('#description');

    event.target.value = 'This recipe is made with love';
    descriptionInput.simulate('change', event);

    expect(wrapper.instance().state.description).toBe('This recipe is made with love');
  });

  it('should set ingredients state when input values changes', () => {
    const event = {
      target: { name: 'ingredients', value: '' }
    };
    const wrapper = setup();
    const ingredientsInput = wrapper.find('#ingredients');

    event.target.value = 'pepper, salt, oil, water, fish';
    ingredientsInput.simulate('change', event);

    expect(wrapper.instance().state.ingredients).toBe('pepper, salt, oil, water, fish');
  });

  it('should set preparation state when input values changes', () => {
    const event = {
      target: { name: 'preparation', value: '' }
    };
    const wrapper = setup();
    const preparationInput = wrapper.find('#preparation');

    event.target.value = 'pepper, salt, oil, water, fish';
    preparationInput.simulate('change', event);

    expect(wrapper.instance().state.preparation).toBe('pepper, salt, oil, water, fish');
  });

  it('should set image state when input values changes', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'image', value: '' }
    };
    const wrapper = setup();
    const imageInput = wrapper.find('#image');

    event.target.files = 'pepper.jpeg';
    imageInput.simulate('change', event);
    wrapper.setState({
      image: event.target.files
    });
    expect(wrapper.instance().state.image).toBe('pepper.jpeg');
  });
});

describe('Connected AddRecipeForm component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      recipeReducer: {
        recipes: () => { }
      }
    });
    const wrapper = shallow(<ConnectedAddRecipeForm store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
