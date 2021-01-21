import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AddRecipePage } from
  '../../../../components/Recipes/AddRecipe/AddRecipePage.jsx';


const setup = () => shallow(<AddRecipePage />);

describe('AddRecipePage Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    const divs = wrapper.find('div.row');
    expect(divs.length).toBe(1);
  });
});
