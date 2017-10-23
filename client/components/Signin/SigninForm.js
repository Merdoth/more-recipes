import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';




class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value }) 
    }

    onClick(event) {
        event.preventDefault();
        this.props.userSigninRequest(this.state);
    }

    render() {
        return (
            <div> 
                <div style={{'width':50+'%', 'margin':5+'% auto', 'padding':1+'%', 'background':'white'}}>
                    <form className="form-signin">
                        <h2 className="form-signin-heading"><b>Sign In</b></h2><hr/>
                        <label htmlFor="inputEmail" className="control-label">Email address</label>
                        <input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="Email address" required="" autoFocus=""/>
                        <label htmlFor="inputPassword" className="control-label">Password</label>
                        <input  value={this.state.password} onChange={this.onChange} type="password" name="password" className="form-control" placeholder="Password" required=""/>
                        <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.onClick}><i className="fa fa-user-plus"></i> Sign In</button><br/>
                        <p className="new_account" style={{'textAlign': 'center'}}><strong>Create A New Account? </strong><Link to="Signup">Sign Up</Link></p>
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
 
 
 
 
 
 
 
 
 
 
 