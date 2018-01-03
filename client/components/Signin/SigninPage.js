import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SigninForm from './SigninForm';
import { userSigninRequest } from '../../actions/signinActions';


/**
 * @param { SignupFrom } SignupForm
 * @returns { SignupForm } SignupForm
 */
class SigninPage extends React.Component {
  render() {
    const { userSigninRequest } = this.props;
    return (
            <div className='row cover'>
               <div className='col-md-4 col-md-offset-4'>
               <SigninForm userSigninRequest={userSigninRequest} />
               </div>
           </div>
    );
  }
}

SigninPage.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

export default connect(null, { userSigninRequest })(SigninPage);
