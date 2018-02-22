import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SearchResult } from
  '../../../components/Search/SearchResult.jsx';

/* global jest */

const setup = () => {
  const props = {
    recipes: [
      {
        id: 1,
        userId: 1,
        recipeName: 'Sweet cake',
        description: 'sweet',
        ingredients: 'floor, sugar, butter, salt',
        preparation: 'Mix and bake',
        image: '/img/toast_qaxxcy.jpg',
        views: 0,
        upVotes: 0,
        downVotes: 0,
        createdAt: '2018-02-13T22:14:54.283Z',
        updatedAt: '2018-02-18T15:23:59.106Z',
      }
    ],
    location: {
      state: jest.fn()
    },
    searchRecipe: jest.fn(),
    pagination: {
      pageCount: 1
    }
  };

  return shallow(<SearchResult {...props} />);
};

describe('SearchResult Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
