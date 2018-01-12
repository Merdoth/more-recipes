import React, { Component } from 'react';
import NavigationBar from './NavigationBar.jsx';
import FlashMessageList from './flash/FlashMessagesList';


class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <FlashMessageList
          messages={[{ id: 1, message: 'hello' }]}
        />
        {this.props.children}
        <div className="appChild">
        </div>
      </div>

    );
  }
}

export default App;

