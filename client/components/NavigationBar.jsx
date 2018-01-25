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
  /**
   * Creates an instance of NavigationBar.
   * @param {any} props
   * @memberof NavigationBar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  /**
   * @param {any} event
   * @memberof NavigationBar
   * @returns { void }
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   *
   *
   * @returns
   * @memberof NavigationBar
   * @returns { void }
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
            Hi, {this.props.user.userName}
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
   * @returns { void }
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
   * @returns { void }
   * @memberof NavigationBar
   */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark header">
        <Link className="navbar-brand" to="/recipes">
          MORE RECIPES
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
          <form className="form-inline my-2 my-lg-0 float-menuitem-right">
            <input
              className="form-control mr-sm-2 search"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
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
