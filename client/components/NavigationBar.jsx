import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @param { NavigationBar } NavigationBar
 * @returns { NavigationBar } NavigationBar
 */
class NavigationBar extends React.Component {
  /**
   *
   * @returns { Jsx } Jsx
   */
  render() {
    return (
      <div className="container-fluid wrapper">
        <div className="row header">
          <div className="col-xs-12 col-md-6 navs">
            <h2>More Recipes</h2>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="float-right topnavdiv">
              <ul className="nav nav-pills flex-column flex-sm-row flex-sm-fill text-sm-center topnav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="Signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="Signin">Sign In</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NavigationBar;
