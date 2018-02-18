import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedProfile, { Profile } from '../../components/Profile.jsx';
import InputField from '../../components/common/InputField.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* global jest */
let props;
const setup = () => {
  props = {
    getOneUser: () => { },
    updateUserProfile: () => jest.fn,
  };
  return shallow(<Profile {...props} />);
};

describe('Profile Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper.find(InputField)).toHaveLength(3);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return profile', () => {
    const wrapper = setup();
    wrapper.setState({
      fullName: 'Samuel Uyali',
      userName: 'Samuel',
      email: 'samuel.uyali@gmail.com',
    });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onSubmit()', () => {
  it('should update profile to the state', () => {
    const event = {
      preventDefault: jest.fn(),
      updateUserProfile: jest.fn()
    };
    const wrapper = setup();
    const button = wrapper.find('.profileButton');
    button.simulate('click', event);
  });
});

describe('componentWillReceiveProps()', () => {
  it('should call componentWillReceiveProps()', () => {
    const wrapper = setup();
    wrapper.setProps({ user: { fullName: 'test' } });
    expect(wrapper.state('fullName')).toEqual('test');
  });
});

describe('onChange()', () => {
  it('should set fullName to state when input values changes', () => {
    const event = {
      target: { name: 'fullName', value: '' }
    };
    const wrapper = setup();
    const fullNameInput = wrapper.find('#fullName');

    event.target.value = 'Sarah Gigs';
    fullNameInput.simulate('change', event);

    expect(wrapper.instance().state.fullName).toBe('Sarah Gigs');
  });

  it('should set userName state when input values changes', () => {
    const event = {
      target: { name: 'userName', value: '' }
    };
    const wrapper = setup();
    const userNameInput = wrapper.find('#userName');

    event.target.value = 'Sarah';
    userNameInput.simulate('change', event);

    expect(wrapper.instance().state.userName).toBe('Sarah');
  });

  it('should set email state when input values changes', () => {
    const event = {
      target: { name: 'email', value: '' }
    };
    const wrapper = setup();
    const emailInput = wrapper.find('#email');

    event.target.value = 'sarah.gigs@gmail.com';
    emailInput.simulate('change', event);

    expect(wrapper.instance().state.email).toBe('sarah.gigs@gmail.com');
  });
});

describe('Connected Profile component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      getOneUser: {
        users: {
          user: { id: 1 }
        }
      },
    });
    const wrapper = shallow(<ConnectedProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
