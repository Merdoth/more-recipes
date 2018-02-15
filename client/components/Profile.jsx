import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from './common/InputField.jsx';
import Button from './common/Button.jsx';
import { getOneUser, updateUserProfile } from '../actions/userActions';

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
   * @param {object} props
   *
   * @memberof Profile
   *
   * @returns { undefined }
   */
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      email: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
*
* @param {*} nextProps updated props
* @returns {DOM} DOM object
*/
  componentWillReceiveProps(nextProps) {
    this.setState({
      fullName: nextProps.user.fullName,
      userName: nextProps.user.userName,
      email: nextProps.user.email,
    });
  }
  /**
    * @param {object} event
    *
    * @memberof Profile
    *
    * @returns { undefined }
    */
  componentDidMount() {
    this.props.getOneUser();
  }
  /**
   * @param {object} event
   *
   * @memberof Profile
   *
   * @returns { undefined }
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {object} event
   *
   * @memberof Profile
   *
   * @returns { undefined }
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateUserProfile(this.state);
    this.setState({ errors: {} });
  }

  /**
   * @returns {undefined }
   *
   * @memberof Profile
   */
  render() {
    return (
      <div>
        <form className="profile">
          <h1 id="profile-header">Profile</h1>
          <InputField
            id="fullName"
            type="text"
            name="fullName"
            value={this.state.fullName}
            label="Fullname:&nbsp;&nbsp;&nbsp;"
            onChange={this.onChange}
            required
            placeholder="null"
          />
          <InputField
            id="userName"
            type="text"
            name="userName"
            value={this.state.userName}
            label="Username:&nbsp;&nbsp;&nbsp;"
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
          <Button
            type="submit"
            onClick={this.onSubmit}
            name="Update Profile"
            className="btn btn-lg profileButton"
          />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.getOneUser.users.user
});
export default connect(
  mapStateToProps,
  { getOneUser, updateUserProfile }
)(Profile);
