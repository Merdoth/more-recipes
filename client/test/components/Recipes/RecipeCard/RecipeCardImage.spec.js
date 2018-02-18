import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { RecipeCardImage } from
  '../../../../components/Recipes/RecipeCard/RecipeCardImage.jsx';

const setup = () => shallow(<RecipeCardImage />);

describe('RecipeCardDes Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
