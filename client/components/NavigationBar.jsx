import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logout } from '../actions/auth/authActions';

/**
 * @param { NavigationBar } NavigationBar
 * @returns { NavigationBar } NavigationBar
 */
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  /**
   *
   * @returns { Jsx } Jsx
   */

  loggedInMenu() {
    return (
      <ul className="nav nav-pills flex-column flex-sm-row flex-sm-fill text-sm-center topnav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">My Recipes</Link>
        </li>
        <li>
          <a onClick={this.logout}>
            Sign Out
          </a>
        </li>
      </ul>
    );
  }

  notLoggedInMenu() {
    return (
      <ul className="nav nav-pills flex-column flex-sm-row flex-sm-fill text-sm-center topnav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/Signin">Sign In</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="container-fluid wrapper">
        <div className="row header">
          <div className="col-xs-12 col-md-6 navs">
            <h2>More Recipes</h2>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="float-right topnavdiv">
              {this.props.isAuthenticated
                ? this.loggedInMenu()
                : this.notLoggedInMenu()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
NavigationBar.PropTypes = {
  logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);
