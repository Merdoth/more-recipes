import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';
import InputField from '../common/InputField.jsx';
import { login } from '../../actions/auth/authActions';
import { validateSigninFormInput } from '../../validations';

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

  // /**
  //  * @param { event } event
  //  * @returns { state } state
  //  */
  // onChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }
  // /**
  //  * @param { event } event
  //  * @returns { state } state
  //  */
  // onSubmit(event) {
  //   event.preventDefault();
  //   this.setState({ errors: {}, isLoading: true });
  //   this.props
  //     .userSigninRequest(this.state)
  //     .then(
  //       () => {},
  //       ({ data }) => this.setState({ errors: data, isLoading: false })
  //     );
  // }
  /**
   * This method validates the input from the state object
   * and chcecks if its valid and makes an api call to the backend
   *
   * @param {any} event
   * @memberof SigninForm
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateSigninFormInput(this.state);
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
          // Materialize.toast('Welcome!', 3000, 'green');
          this.props.history.push('/profile');
        })
        .catch((err) => {
          // console.log(err.data.message);

          const error = err.data.message;
          // this.handleErrors(error);
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
   *  this method is gets the values of the input
   * and passes the values to the global state object
   * @param {any} event
   * @memberof SigninForm
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * this method handle errors that return as an object
   *
   * @param {any} errors
   * @memberof SigninForm
   * @returns {void}
   */
  handleErrors(errors) {
    Object.keys(errors).forEach((error) => {
      console.log(errors[error]);
      swal({
        title: 'Oops!',
        text: errors[error],
        icon: 'error'
      });

      // Materialize.toast(errors[error], 3000, 'red');
    });
  }
  /**
   *
   * @returns { Jsx } Jsx
   */
  render() {
    const { errors } = this.state;
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
