import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SigninForm } from
  '../../../components/Signin/SigninForm.jsx';

/* global jest */

const setup = () => shallow(<SigninForm />);

describe('SigninForm Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
