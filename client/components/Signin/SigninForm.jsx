import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';
import { validateSignIn } from '../../validations/index';
import InputField from '../common/InputField.jsx';
import { login } from '../../actions/auth/authActions';

/**
 * @description this renders the signin form component
 *
 * @param { Object } SigninForm
 *
 * @returns { undefined } SignupForm
 */
class SigninForm extends Component {
  /**
   *n
   * @param { Object } props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * This method validates the input from the state object
   * and chcecks if its valid and makes an api call to the backend
   *
   * @param { Object } event
   *
   * @memberof SigninForm
   *
   * @returns { undefined }
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateSignIn(this.state);
    if (isValid) {
      this.setState({ isLoading: true });
      this.props
        .login(this.state)
        .then(() => {
          swal({
            title: 'Welcome!',
            text: this.state.email.split('@')[0],
            icon: 'success'
          });
          this.props.history.push('/recipes');
        })
        .catch((err) => {
          const error = err.response.data.message;
          swal({
            title: 'Oops!',
            text: error,
            icon: 'error'
          });
          this.setState({ isLoading: false });
        });
    } else {
      this.handleErrors(errors);
    }
  }

  /**
   *  this method gets the values of the input
   * and passes the values to the global state object
   * @param { Object } event
   *
   * @memberof SigninForm
   *
   * @returns { undefined }
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * this method handle errors
   * @param { Object } errors
   *
   * @memberof SigninForm
   *
   * @returns { undefined }
   */
  handleErrors(errors) {
    Object.keys(errors).forEach((error) => {
      swal({
        title: 'Oops!',
        text: errors[error],
        icon: 'error'
      });
    });
  }
  /**
   *
   * @returns { undefined }
   *
   * @memberof SignupForm
   */
  render() {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 cover1">
          <div className="form-deco">
            <form className="form-signin">
              <h2 className="form-signin-heading">Sign In</h2>
              <hr />

              <InputField
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={this.state.email}
                label="Email Address"
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
              <Button
                type="submit"
                onClick={this.onSubmit}
                disabled={this.state.isLoading}
                name="Sign In"
                iconClass="fa-user-plus"
                className="btn btn-lg btn-primary btn-block"
              />

              <p className="new_account">
                <strong>Create A New Account? </strong>
                <Link to="Signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
SigninForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(SigninForm);
