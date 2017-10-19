import React from 'react';

export default () => {
    return (
        <div className=" hero-bg">
        <div className="container-fluid">
           <div className="row search">
              <form style={{"width":40+'%'}}>
              <div className="input-group">
              <input type="text" className="form-control Enter" placeholder="Enter search input"><span className="input-group-button"><button className="btn hit" type="button">Search</button></span>
              </div>
              </form>
           </div>
        </div>
        </div>
    
    )

}