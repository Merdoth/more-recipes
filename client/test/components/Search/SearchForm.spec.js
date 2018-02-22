import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SearchForm } from
  '../../../components/Search/SearchForm.jsx';


const setup = () => shallow(<SearchForm />);

describe('SearchForm Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
