import React from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="container-fluid wrapper" style={{'height':50+'%'}}>
        <div className="row header">
            <div className="col-xs-12 col-md-3 navs">
                <h2>More Recipes</h2>
            </div>
          <div className="col-xs-12 col-md-3">
              <ul className="nav nav-pills flex-column flex-sm-row flex-sm-fill text-sm-center topnav">                                                                                                                              
               <li><Link to="Signup">Sign Up</Link></li> 
               <li><Link to="Signin">Sign In</Link></li>
                {/* <a href="javascript:void(0);" style={{"fontSize":15+'px'}} className="icon">&#9776;</a> */}
              </ul>
          </div>
        </div>
      </div>
    )
}
}
export default NavigationBar;