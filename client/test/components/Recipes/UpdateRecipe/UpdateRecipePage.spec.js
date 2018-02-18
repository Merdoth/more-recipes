import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { UpdateRecipePage } from
  '../../../../components/Recipes/UpdateRecipe/UpdateRecipePage.jsx';

  /* global jest */

const setup = () => {
  const props = {
    goToRecipes: () => jest.fn(),
  };
  return shallow(<UpdateRecipePage {...props} />);
};

describe('UpdateRecipePage Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
