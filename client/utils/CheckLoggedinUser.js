import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from './history';

const CheckLoggedInUser = (ComposedComponent) => {
  /**
   * @class Authenticate
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
     *
     * @method componentWillMount
     *
     * @return {*} set user authentication status
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        history.push('/Profile');
      }
    }
    /**
     *
     * @param {*} nextProps
     *
     * @return {*} props
     */
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        history.push('/Profile');
      }
    }
    /**
     * @return { Component-DOM } DOM
     */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.setCurrentUser.isAuthenticated
  });

  return connect(mapStateToProps, null)(Authenticate);
};
export default CheckLoggedInUser;
