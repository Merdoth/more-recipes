import React from 'react';
import NavigationBar from './NavigationBar.jsx';

/**
 * @description this returns an App component
 * @extends {Component}
 */
// class App extends Component {
//   /**
//    * @returns { void }
//    * @memberof App
//    */
//   render() {
//     return (
//       <div>
//         <NavigationBar />
//         {this.props.children}
//         <div className="appChild" />
//       </div>
//     );
//   }
// }

const App = ({ children }) => (
  <div>
    <NavigationBar />
    {children}
    <div className="appChild" />
  </div>
);

export default App;
