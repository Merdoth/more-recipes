import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value }) 
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        this.props.userSigninRequest(this.state).then(
          () => {},
          ({ data }) => this.setState({ errors: data, isLoading: false})
        );
    }

    render() {

        const { errors } = this.state;
        return (
            <div> 
                <div style={{'margin':5+'% auto', 'padding':1+'%', 'background':'white'}}>
                    <form className="form-signin">
                        <h2 className="form-signin-heading"><b>Sign In</b></h2><hr/>
                        
                        <div className={classnames("form-group", { 'has-error': errors.email })}>
                        <label htmlFor="inputEmail" className="control-label">Email Address</label>
                        <input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="Email address" required="" autoFocus=""/>
                        {errors.email && <span className="help-block">{errors.email}</span>}
                        </div>

                        <div className={classnames("form-group", { 'has-error': errors.password })}>
                        <label htmlFor="inputPassword" className="control-label">Password</label>
                        <input  value={this.state.password} onChange={this.onChange} type="password" name="password" className="form-control" placeholder="Password" required=""/>
                        {errors.password && <span className="help-block">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                        <button disabled={this.state.isLoading } type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}><i className="fa fa-user-plus"></i> Sign In</button><br/>
                        <p className="new_account" style={{'textAlign': 'center'}}><strong>Create A New Account? </strong><Link to="Signup">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
                </div> 
    
        )
    }
} 

SigninForm.propTypes = {
    userSigninRequest: PropTypes.func.isRequired
}

export default SigninForm;
 
 
 
 
 
 
 
 
 
 
 