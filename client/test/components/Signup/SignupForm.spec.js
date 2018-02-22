import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SignupForm } from
  '../../../components/Signup/SignupForm.jsx';


const setup = () => shallow(<SignupForm />);

describe('SignupForm Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
