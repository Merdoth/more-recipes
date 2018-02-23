import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../../actions/auth/authActions';
import { validateSignUp } from '../../validations/index';
import InputField from '../common/InputField.jsx';
import Button from '../common/Button.jsx';

/**
 * @description this renders the signup form component
 *
 * @returns { undefined }
 */
export class SignupForm extends Component {
  /**
   *
   * @param { Object } props
   */
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
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
   * @param { Object } event
   *
   * @returns { undefined }
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param { Object } event
   *
   * @returns { Object } state
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
          this.props.goToAllRecipes();
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
   * @param { Object } errors
   *
   * @memberof SignupForm
   *
   * @returns { undefined }
   */
  handleErrors(errors) {
    if (typeof errors !== 'string') {
      Object.keys(errors).forEach((error) => {
        swal({
          title: 'Oops!',
          text: errors[error],
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
   * @returns { undefined }
   *
   * @memberof SignupForm
   */
  render() {
    return (
      <div>
        <div className="form-deco">
          <form id="TestForm" className="form-signin">
            <h2 className="form-signin-heading">Sign Up</h2>
            <hr />
            <InputField
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Enter your fullname"
              value={this.state.fullName}
              label="Fullname"
              onChange={this.onChange}
              required
            />
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
              id="signUpBtn"
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
  userSignupRequest: PropTypes.func.isRequired,
  goToAllRecipes: PropTypes.func.isRequired
};

const mapDispatchToProps = { userSignupRequest };
export default connect(null, mapDispatchToProps)(SignupForm);
