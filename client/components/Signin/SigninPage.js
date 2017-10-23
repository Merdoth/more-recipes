import React from 'react';
import SigninForm from './SigninForm';
import Footer from '../Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSigninRequest } from '../../actions/signinActions';


class SigninPage extends React.Component {
    render() {
        const {userSigninRequest} = this.props;
        return (
           <div>
               <div className="row">
                       <SigninForm  userSigninRequest={userSigninRequest} />
               </div>
               <Footer />
           </div>
        )
    }    
}

SigninPage.propTypes = {
    userSigninRequest: PropTypes.func.isRequired
}

export default connect(null, { userSigninRequest })(SigninPage);