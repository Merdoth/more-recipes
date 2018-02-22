import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Slider } from '../../components/Slider.jsx';

const setup = () => shallow(<Slider/>);

describe('Slider Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
