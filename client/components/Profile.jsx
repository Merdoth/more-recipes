import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from './common/InputField.jsx';
import Button from './common/Button.jsx';
import { getOneUser, updateUserProfile } from '../actions/userActions';

/**
 * @description this class returns a Profile component
 *
 * @returns { undefined }
 *
 */
export class Profile extends Component {
  /**
   * Creates an instance of Profile.
   *
   * @param { Object } props
   *
   * @memberof Profile
   *
   * @returns { Object } json - payload
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
* @param { Function } nextProps updated props
*
* @returns { DOM } DOM object
*/
  componentWillReceiveProps(nextProps) {
    this.setState({
      fullName: nextProps.user.fullName,
      userName: nextProps.user.userName,
      email: nextProps.user.email,
    });
  }
  /**
    *
    * @memberof Profile
    *
    * @returns { Object } json - payload
    */
  componentDidMount() {
    this.props.getOneUser();
  }
  /**
   * @param { Object } event
   *
   * @memberof Profile
   *
   * @returns { Object } json - payload
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param { Object } event
   *
   * @memberof Profile
   *
   * @returns { Object } json - payload
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateUserProfile(this.state);
    this.setState({ errors: {} });
  }

  /**
   * @returns { undefined }
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
