import React from 'react';

class SearchBar extends React.Component {
    render() {
    return (
        <div className="" style={{
            position: 'absolute',
            top: '70%',
            left: '20%',
            width: '60%'
        }}>
        <div className="container-fluid">
           <div className="row">
              <div className="col-md-12">
                <form>
                <div className="input-group">
                <input type="text" className="form-control Enter" placeholder="Enter search input"/><span className="input-group-button"><button className="btn hit" type="button">Search</button></span>
                </div>
                </form>
              </div>
           </div>
        </div>
        </div>
    
    )

}
}
export default SearchBar;