import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedRecipeDetailsFooter,{ RecipeDetailsFooter } from
  '../../../../components/Recipes/RecipeCard/RecipeDetailsFooter.jsx';
import Button from '../../../../components/common/Button.jsx';

/* global jest */
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = () => shallow(<RecipeDetailsFooter />);

describe('RecipeDetailsFooterComponent snapshot', () => {
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
  xit('should add recipes to the state', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = setup();
    const form = wrapper.find('.cta-btn');
    wrapper.setState({
      fullName: 'ucheya'
    });

    form.simulate('submit', event);
  });
});

describe('handleDelete()', () => {
  xit('should add recipes to the state', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = setup();
    const form = wrapper.find('.cta-btn');
    wrapper.setState({
      fullName: 'ucheya'
    });

    form.simulate('submit', event);
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

