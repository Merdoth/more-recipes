import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SignupPage } from
  '../../../components/Signup/SignupPage.jsx';


const setup = () => shallow(<SignupPage />);

describe('SignupPage Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
