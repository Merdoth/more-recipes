import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from './history';

const AuthenticateUser = (ComposedComponent) => {
  /**
   * @class
   */
  class Authenticate extends Component {
    /**
     * @method componentWillMount
     *
     * @return { undefined } set user authentication status
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        history.push('/login');
      }
    }
    /**
     * @method componentWillUpdate
     *
     * @param { Object } nextProps
     *
     * @return { Object } props
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        history.push('/login');
      }
    }

    /**
     *
     * @returns { undefined }
     *
     * @memberof Authenticate
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.setCurrentUser.isAuthenticated,
  });

  return connect(mapStateToProps, null)(Authenticate);
};
export default AuthenticateUser;
