import React, { Component } from 'react';
import CarouselGames from './catalogue/CarouselGames';
import CollectionSmall from './catalogue/CollectionSmall';
import Button from './Button'
import {Link} from 'react-router-dom'

class Homepage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                
                <img className='logo header' src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg" alt=""/>
                <h1 className='header'>Gamery</h1>
                <h2 className='header'>Find and collect games you love</h2>
                
                <CarouselGames header='Most popular' route = 'https://www.boardgameatlas.com/api/search?client_id=FWG6FKSO4N&order_by=num_user_rating'/>
                <CarouselGames header='Latest releases' route='https://www.boardgameatlas.com/api/search?client_id=FWG6FKSO4N&year_published=2020'/>
                <CarouselGames header='Best rated' route='https://www.boardgameatlas.com/api/search?client_id=FWG6FKSO4N&order_by=average_user_rating'/>
                
                <h3>Browse categories</h3>
                <CollectionSmall route='/categories/family-games' colTitle="Family games" src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg"/>
                <CollectionSmall route= 'categories/complex-games' colTitle="Complex games" src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg"/>
                <CollectionSmall route= 'categories/cooperative-games' colTitle="Cooperative games" src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg"/>
                <Link to='/categories'>
                <Button>See all categories</Button>
                </Link>
            </div>
         );
    }
}
 
export default Homepage;