import React from 'react';
import NavigationBar from './NavigationBar';
import Slider from './Slider.js';
import SearchBar from './SearchBar.js';

class App extends React.Component{
    render() { 
        return(
            <div className='containter-fluid'>
                <NavigationBar />
                <Slider />
                <SearchBar />
            </div>
        );
    }
}

export default App;