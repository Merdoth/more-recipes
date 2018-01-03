import React from 'react';
import InputField from './common/InputField';
import Button from './common/Button';

/**
 * @param { SignupFrom } SignupForm
 * @returns { SignupForm } SignupForm
 */

class Profile extends React.Component {
  /**
   *n
   * @param { props } props
   */
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      eName: '',
      cName: '',
      status: '',
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
                  id="fName"
                  type="text"
                  name="fName"
                  placeholder="Samson Trina"
                  value={this.state.fName}
                  label="Name:&nbsp;&nbsp; &nbsp;"
                  onChange={this.onChange}
                />

                <InputField
                  id="eName"
                  type="text"
                  name="eName"
                  placeholder="meya@gmail.com"
                  value={this.state.eName}
                  label="Email:&nbsp;&nbsp; &nbsp;&nbsp;"
                  onChange={this.onChange}
                />

                <InputField
                  id="cName"
                  type="number"
                  name="cName"
                  placeholder="Phone number"
                  value={this.state.cName}
                  label="Contact:&nbsp;"
                  onChange={this.onChange}
                />

                <InputField
                  id="status status1"
                  type="text"
                  name="status"
                  placeholder="What's on your mind ?"
                  value={this.state.status}
                  label="Status:&nbsp;&nbsp;&nbsp;&nbsp;"
                  onChange={this.onChange}
                />

                <Button
                  type="submit"
                  onClick={this.onSubmit}
                  name="Submit"
                  iconClass="fa-user-plus"
                  className="btn btn-lg btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
