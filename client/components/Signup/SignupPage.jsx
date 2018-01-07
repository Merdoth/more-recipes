import React from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm.jsx';
import userSignupRequest from '../../actions/auth/signupActions';
import addFlashMessage from '../../actions/flashMessages/addFlashMessage';

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 offset-md-3 cover">
            <SignupForm
              userSignupRequest={userSignupRequest}
              addFlashMessage={addFlashMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);
