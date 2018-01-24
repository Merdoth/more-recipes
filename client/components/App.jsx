import React, { Component } from 'react';
import NavigationBar from './NavigationBar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <div className="appChild" />
      </div>
    );
  }
}

// const App = ({ children }) => (
//   <div>
//     <NavigationBar />
//     {children}
//     <div className="appChild" />
//   </div>
// );

export default App;
