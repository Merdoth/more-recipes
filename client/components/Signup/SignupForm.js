import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',                                                                                                                                                                                                                                                                                                                                                                                                                               
            password: '',
            // confirmPassword: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);

        console.log(PropTypes, 'prop')
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onClick(event) {
        event.preventDefault();
        this.props.userSignupRequest(this.state);
    }
    render() {
        return (
            <div>
                <div style={{'background':'white', 'padding':1+'%' , 'margin':2+'% auto'}}>
                    <form className="form-signin">
                        <h2 className="form-signin-heading"><b>Sign Up</b></h2><hr/><br/>
            
                       <div>
                       <label htmlFor="inputUsername" className="control-label">Username</label>
                        <input value={this.state.username} onChange={this.onChange} type="text" name="username" className="form-control" placeholder="Username" required="" autoFocus=""/><br/>
                       </div>

                       <div>
                       <label  htmlFor="inputEmail" className="control-label">Email address</label>
                        <input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="Email address" required=""/><br/>
                       </div>

                       <div>
                       <label  htmlFor="inputPassword" className="control-label">Password</label>
                        <input value={this.state.password} onChange={this.onChange} type="password" name="password" className="form-control" placeholder="Password" required=""/><br/>
                       </div>
                       
                        {/* <label  htmlFor="inputPassword" className="control-label">Confirm Password</label>
                        <input value={this.state.confirmPassword} onChange={this.onChange} type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" required=""/><br/> */}
            
                        <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.onClick}><i className="fa fa-user-plus"></i> Sign Up</button><br/>
                        <p className="new_account" style={{'textAlign': 'center'}}><strong>Already Have An Account? </strong><Link to="Signin">Sign in</Link></p>
                    </form>
                </div><br/><br/>
            </div>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}
export default SignupForm;




