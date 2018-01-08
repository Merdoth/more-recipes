import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SigninForm from './SigninForm.jsx';
import login from '../../actions/auth/authActions';

/**
 * @param { SignupFrom } SignupForm
 * @returns { SignupForm } SignupForm
 */
class SigninPage extends React.Component {
  render() {
    const { login } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 cover1">
          <SigninForm userSigninRequest={login} />
        </div>
      </div>
    );
  }
}

SigninPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(SigninPage);
