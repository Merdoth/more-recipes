import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from './common/InputField.jsx';

/**
 * @param { Profile } Profile
 *
 * @returns { Profile } Profile
 *
 * @desc this class returns a Profile component
 */
class Profile extends Component {
  /**
   * Creates an instance of Profile.
   *
   * @param {any} props
   *
   * @memberof Profile
   *
   * @returns { void }
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.user.userName,
      email: this.props.user.email,
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} event
   *
   * @memberof Profile
   *
   * @returns { void }
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   *
   * @memberof Profile
   *
   * @returns { void }
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
  }

  /**
   * @returns {void }
   *
   * @memberof Profile
   */
  render() {
    return (
      <div>
        <h1 id="profile-header">Profile</h1>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <div className="MyPicture">
                <img src="./image/moi.jpg" />
              </div>
            </div>
            <div className="col-xs-12 col-md-9 user-details">
              <form>
                <InputField
                  id="userName"
                  type="text"
                  name="userName"
                  value={this.state.userName}
                  label="Name:&nbsp;&nbsp;&nbsp;"
                  onChange={this.onChange}
                  required
                  placeholder="null"
                />
                <InputField
                  id="email"
                  type="text"
                  name="email"
                  value={this.state.email}
                  label="Email:&nbsp;&nbsp;&nbsp;&nbsp;"
                  onChange={this.onChange}
                  required
                  placeholder="null"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.setCurrentUser.user
});
export default connect(mapStateToProps, null)(Profile);
