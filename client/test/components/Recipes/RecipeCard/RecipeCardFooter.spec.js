import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { RecipeCardFooter } from
  '../../../../components/Recipes/RecipeCard/RecipeCardFooter.jsx';

const setup = () => shallow(<RecipeCardFooter />);

describe('RecipeCardDes Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
