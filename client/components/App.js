import React from 'react';
import NavigationBar from './NavigationBar';
import Slider from './Slider.js';
import SearchBar from './SearchBar.js';
import RecipeCard from './RecipeCard.js';
import Footer from './Footer.js';

class App extends React.Component{
    render() { 
        return(
            <div>
                <NavigationBar />
                <Slider />
                <RecipeCard />
                <Footer />
                <SearchBar />
               

               
            </div>
        );
    }
}

export default App;