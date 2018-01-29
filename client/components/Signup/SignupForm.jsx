import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import history from '../../utils/history';
import { validateSignUp } from '../../validations';
import { userSignupRequest } from '../../actions/auth/authActions';
import InputField from '../common/InputField.jsx';
import Button from '../common/Button.jsx';

/**
 * @description this renders the signup form component
 *
 * @param { SignupFrom } SignupForm
 *
 * @returns { SignupForm } SignupForm
 */
class SignupForm extends Component {
  /**
   *
   * @param { props } props
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param { event } event
   *
   * @returns { state } state
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param { event } event
   *
   * @returns { state } state
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateSignUp(this.state);
    if (isValid) {
      this.setState({ isLoading: true });
      this.props
        .userSignupRequest(this.state)
        .then(() => {
          swal({
            title: 'Welcome!',
            text: this.state.email.split('@')[0],
            icon: 'success'
          });
          history.push('/profile');
        })
        .catch((err) => {
          const error = err.data.message;
          this.handleErrors(error);
          this.setState({ isLoading: false });
        });
    } else {
      this.handleErrors(errors);
    }
  }

  /**
   *
   * @returns {void}
   *
   * @param {any} errors
   *
   * @memberof SignupForm
   */
  handleErrors(errors) {
    if (typeof errors !== 'string') {
      Object.keys(errors).forEach((error) => {
        swal({
          title: 'Oops!',
          text: 'sorry one or more fields are empty',
          icon: 'error'
        });
      });
    } else {
      swal({
        title: 'Oops!',
        text: errors,
        icon: 'error'
      });
    }
  }
  /**
   *
   * @returns {void}
   *
   * @memberof SignupForm
   */
  render() {
    return (
      <div>
        <div className="form-deco">
          <form className="form-signin">
            <h2 className="form-signin-heading">Sign Up</h2>
            <hr />

            <InputField
              type="text"
              className="form-control"
              name="userName"
              placeholder="Enter your username"
              value={this.state.userName}
              label="Username"
              onChange={this.onChange}
              required
            />
            <InputField
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={this.state.email}
              label="Email address"
              onChange={this.onChange}
              required
            />
            <InputField
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              label="Password"
              onChange={this.onChange}
              required
            />
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              label="Confirm Password"
              onChange={this.onChange}
              required
            />
            <Button
              type="submit"
              onClick={this.onSubmit}
              disabled={this.state.isLoading}
              name="Sign Up"
              iconClass="fa-user-plus"
              className="btn btn-lg btn-primary btn-block"
            />
            <p className="new_account">
              <strong>Already Have An Account? </strong>
              <Link to="Signin">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};
const mapDispatchToProps = { userSignupRequest };
export default connect(null, mapDispatchToProps)(SignupForm);
