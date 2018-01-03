import React from 'react';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import validateInput from '../../../server/shared/validations/signup';
import InputField from '../common/InputField';
import Button from '../common/Button';

/**
 * @param { SignupFrom } SignupForm
 * @returns { SignupForm } SignupForm
 */
class SignupForm extends React.Component {
  /**
     *
     * @param { props } props
     */
  constructor(props) { 
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false,
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
    console.log('I am called');

    if (validateInput(this.state).isValid) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have signed up successfully, Welcome!'
          });
          browserHistory.push('/');
        },
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    } else {
      console.log(validateInput(this.state));
    }
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
          <form
            className="form-signin"
          >
            <h2
              className="form-signin-heading"
            >Sign Up</h2><hr />
            <br />

            <InputField
              type="text"
              name="username"
              placeholder="Enter your username"
              value={this.state.username}
              label="Username"
              onChange={this.onChange}
            />

            <InputField
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={this.state.email}
              label="Email address"
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


            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              label="Confirm Password"
              onChange={this.onChange}
            />


          `  <Button
              type="submit"
              onClick={this.onSubmit}
              disabled={this.state.isLoading}
              name="Sign Up"
              iconClass="fa-user-plus"
              className="btn btn-lg btn-primary btn-block"
            >

            </Button>`
            <p
              className="new_account"
              style={{ textAlign: 'center' }}
            >
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
  addFlashMessage: PropTypes.func.isRequired
};
export default SignupForm;
