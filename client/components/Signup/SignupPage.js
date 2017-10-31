import React from 'react';
import Footer from '../Footer';
import SignupForm from './SignupForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';



class SignupPage extends React.Component {
    render() {
        const {userSignupRequest} = this.props;
        return (
                <div>
                    <div className='col-md-4 col-md-offset-4'>
                    <SignupForm userSignupRequest={userSignupRequest} />
                    </div>  
                    <Footer />
                </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(SignupPage);