import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import validateInput from '../../../server/shared/validations/signup';
import classnames from 'classnames';
import { browserHistory } from 'react-router';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',                                                                                                                                     
            password: '',
            confirmPassword: '',
            errors:  {},
            isLoading: false,
        }; 
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(event) {
        event.preventDefault();

        if(this.isValid()) {
        this.setState({ errors: {}, isLoading: true });
        this.props.userSignupRequest(this.state).then(
          () => {
              browserHistory.push('/');
          },
          ({ data }) => this.setState({ errors: data, isLoading: false})
        );

        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div style={{'background':'white', 'padding':1+'%' , 'margin':2+'% auto'}}>
                    <form className="form-signin">
                        <h2 className="form-signin-heading"><b>Sign Up</b></h2><hr/><br/>
            
                       <div className={classnames("form-group", { 'has-error': errors.username })}>
                       <label htmlFor="inputUsername" className="control-label">Username</label>
                        <input value={this.state.username} onChange={this.onChange} type="text" name="username" className="form-control" placeholder="Username" required="" autoFocus=""/><br/>
                        {errors.username && <span className="help-block">{errors.username}</span>}
                       </div>

                       <div className={classnames("form-group", { 'has-error': errors.email })}>
                       <label  htmlFor="inputEmail" className="control-label">Email address</label>
                        <input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="Email address" required=""/><br/>
                        {errors.email && <span className="help-block">{errors.email}</span>}
                       </div>

                       <div className={classnames("form-group", { 'has-error': errors.password })}>
                       <label  htmlFor="inputPassword" className="control-label">Password</label>
                        <input value={this.state.password} onChange={this.onChange} type="password" name="password" className="form-control" placeholder="Password" required=""/><br/>
                        {errors.password && <span className="help-block">{errors.password}</span>}
                       </div>
                       
                       <div className={classnames("form-group", { 'has-error': errors.confirmPassword })}>
                       <label  htmlFor="inputPassword" className="control-label">Confirm Password</label>
                        <input value={this.state.confirmPassword} onChange={this.onChange} type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" required=""/><br/>
                        {errors.confirmPassword && <span className="help-block">{errors.confirmPassword}</span>}
                       </div>
                       
                       <div className="form-group">
                       <button disabled={this.state.isLoading } type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}><i className="fa fa-user-plus"></i> Sign Up</button><br/>
                        <p className="new_account" style={{'textAlign': 'center'}}><strong>Already Have An Account? </strong><Link to="Signin">Sign in</Link></p>
                       </div>
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
