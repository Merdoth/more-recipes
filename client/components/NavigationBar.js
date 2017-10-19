import React from 'react';

export default () => {
    return (
    <div className="container-fluid wrapper" style={{'height':50+'%'}}>
        <div className="row header">
           <div class="col-xs-12 col-md-3 navs">
              <h2>More Recipes</h2>
          </div>
          <div className="col-xs-12 col-md-3">
            <nav className="nav nav-pills flex-column flex-sm-row topnav">
              <a className="flex-sm-fill text-sm-center nav-link login" href="./login.html">Login</a>
              <a className="flex-sm-fill text-sm-center nav-link resgister" href="./register.html">Register</a>
              <a className="flex-sm-fill text-sm-center nav-link Profile" href="/">Logout</a>
              <a href="javascript:void(0);" style={{"fontSize":15+'px'}} className="icon">&#9776;</a>
            </nav>
          </div>
        </div>
      </div>
    )
}