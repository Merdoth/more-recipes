import React from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm.jsx';
import { userSignupRequest } from '../../actions/auth/authActions';
/**
 * @description this returns a signupPage component
 *
 * @extends { Component }
 *
 * @returns { undefined }
 */
const SignupPage = () => (
  <div>
    <div className="row">
      <div className="col-md-6 offset-md-3 cover">
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    </div>
  </div>
);

export default connect(null, {
  userSignupRequest
})(SignupPage);
