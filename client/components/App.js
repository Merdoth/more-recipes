import React from 'react';

import NavigationBar from './NavigationBar';
import FlashMessageList from './flash/FlashMessagesList';


class App extends React.Component{
    render() { 
        return(
            <div>
                <NavigationBar /> 
                <FlashMessageList />
                {this.props.children}
                <div style={{'position': 'absolute', 'bottom': 0, 'width': 100 + '%'}}>
                </div>
            </div>
        );
    }
}

export default App;


                