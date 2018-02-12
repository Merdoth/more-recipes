import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import SearchForm from './Search/SearchForm.jsx';
import { logout } from '../actions/auth/authActions';

/**
 * @description this render the navigation bar which allopws the user move from page to page
 *
 * @param { NavigationBar } NavigationBar
 *
 * @returns { NavigationBar } NavigationBar
 */
class NavigationBar extends React.Component {
  /**
   * Creates an instance of NavigationBar.
   * @param {object} props
   *
   * @memberof NavigationBar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  /**
   * @param {object} event
   *
   * @memberof NavigationBar
   *
   * @returns { undefined }
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
            <a className="dropdown-item" href="/profile">
              Profile
            </a>
            <a className="dropdown-item" href="/addrecipe">
              Add Recipe
            </a>
            <a className="dropdown-item" href="/myrecipes">
              My recipes
            </a>
            <a className="dropdown-item" href="/favourites">
              Favourites
            </a>

            <a className="dropdown-item" href="/recipes">
              All Recipes
            </a>
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
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Signup">
            Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/Signin">
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
    console.log(this.props.user, '=====p===');
    return (
      <nav className="navbar navbar-expand-lg navbar-dark header">
        <Link className="navbar-brand logo" to="/">
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
