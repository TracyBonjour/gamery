import React, { Component } from 'react';
import axios from 'axios';
import GameSmall from './GameSmall'
import images from '../../images'

class CollectionDetailed extends Component {
    
    state = { 
        collection: []
     };

     img(){ 
         return images.find(x => x.category === this.props.colTitle).src};

     componentDidMount() {
        let route;

        if (this.props.collectionId) {
          route = `https://www.boardgameatlas.com/api/search?categories=${this.props.collectionId}&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => response.data)
          .then(data => this.setState({collection: data.games}));
      }
      
    render() { 

        return ( 
            <div>
                <div className="hero-banner" style={{backgroundImage:`url(${this.img()})`}}>                
                </div>
                <h1>Category: {this.props.colTitle}</h1>

                <div>
                    {this.state.collection.map(game => {return(
                        <GameSmall title={game.name} img={game.images.small} id={game.id} />
                     )})}
                </div>
            </div>

         );
    }
}
 
export default CollectionDetailed;