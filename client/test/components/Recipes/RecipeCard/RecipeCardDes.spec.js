import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { RecipeCardDes } from
  '../../../../components/Recipes/RecipeCard/RecipeCardDes.jsx';

const setup = () => shallow(<RecipeCardDes/>);

describe('RecipeCardDes Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
