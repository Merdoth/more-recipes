import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { RecipeCard } from
  '../../../../components/Recipes/RecipeCard/RecipeCard.jsx';

const setup = () => {
  const props = {
    recipeList: {},
  };
  return shallow(<RecipeCard {...props} />);
};

describe('RecipeCard Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
