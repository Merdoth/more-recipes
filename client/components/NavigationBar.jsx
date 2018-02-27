import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import SearchForm from './Search/SearchForm.jsx';
import { logout } from '../actions/auth/authActions';

/**
 * @description Creates an instance of NavigationBar.
 *
 * @returns { undefined }
 */
class NavigationBar extends React.Component {
  /**
   *
   * @param { Object } props
   *
   * @memberof NavigationBar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  /**
   * @param { Object } event
   *
   * @memberof NavigationBar
   *
   * @returns { Object } json - payload
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   *
   * @memberof NavigationBar
   *
   * @returns { undefined }
   */
  loggedInMenu() {
    return (
      <ul className="navbar-nav ">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Hi, {this.props.user.email.replace(/@.*/, '')}
            <i className="fa fa-user-circle-o icon-size" aria-hidden="true" />
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link id="Profile" className="dropdown-item" to="/profile">
              Profile
            </Link>
            <Link
              id="addrecipe"
             className="dropdown-item" to="/addrecipe">
              Add Recipe
            </Link>
            <Link
              id="myrecipes"
             className="dropdown-item" to="/myrecipes">
              My recipes
            </Link>
            <Link className="dropdown-item" to="/favourites">
              Favourites
            </Link>

            <Link className="dropdown-item" to="/recipes" id="allrecipes">
              All Recipes
            </Link>
            <Link onClick={this.logout} className="dropdown-item" to="/">
              Signout
            </Link>
          </div>
        </li>
      </ul>
    );
  }

  /**
   * @returns { undefined }
   *
   * @memberof NavigationBar
   */
  notLoggedInMenu() {
    return (
      <ul className="navbar-nav mr-auto">
        <li id="Home" className="nav-item active">
          <Link
          className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li id="SignUp" className="nav-item">
          <Link
            id="signup" className="nav-link" to="/Signup">
            Sign Up
          </Link>
        </li>

        <li id="SignIn" className="nav-item">
          <Link
            id="signin"
          className="nav-link" to="/Signin">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }

  /**
   * @returns { undefined }
   *
   * @memberof NavigationBar
   */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark header">
        <Link
        id="brand-name"
        className="navbar-brand logo"
        to="/">
          MoRecipes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <SearchForm/>
          {this.props.isAuthenticated
            ? this.loggedInMenu()
            : this.notLoggedInMenu()}
        </div>
      </nav>
    );
  }
}
NavigationBar.PropTypes = {
  logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated,
  user: state.setCurrentUser.user
});

export default connect(mapStateToProps, { logout })(NavigationBar);
