import React from 'react';

import Slider from './Slider.js';
import SearchBar from './SearchBar.js';
import RecipeCard from './RecipeCard.js';
import Footer from './Footer';

class Home extends React.Component{
    render() { 
        return(
            <div>
                <Slider />
                <SearchBar />
                <RecipeCard />
                <Footer />
            </div>
        );
    }
}

export default Home;
