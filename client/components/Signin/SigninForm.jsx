import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';
import InputField from '../common/InputField.jsx';

/**
 * @param { SignupFrom } SignupForm
 * @returns { SignupForm } SignupForm
 */
class SigninForm extends React.Component {
  /**
   *n
   * @param { props } props
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
   * @param { event } event
   * @returns { state } state
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param { event } event
   * @returns { state } state
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props
      .userSigninRequest(this.state)
      .then(
        () => {},
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
  }
  /**
   *
   * @returns { Jsx } Jsx
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
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
            />
            <InputField
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              label="Password"
              onChange={this.onChange}
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
    );
  }
}

SigninForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

export default SigninForm;
