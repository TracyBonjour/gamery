import React, { Component } from 'react';
import CarouselGames from './catalogue/CarouselGames';
import CarouselCollections from './catalogue/CarouselCollections'

class Homepage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                
                <img className='logo header' src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg" alt=""/>
                <h1 className='header'>Gamery</h1>
                <h2 className='header'>Find and collect games you love</h2>
                <CarouselGames header='Most popular'/>
                <CarouselGames header='Latest releases'/>
                <CarouselGames header='Indie games'/>
                
    
            </div>
         );
    }
}
 
export default Homepage;