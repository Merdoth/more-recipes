import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
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
        <div className="appChild" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        </div>
      </div>

    );
  }
}

export default App;

