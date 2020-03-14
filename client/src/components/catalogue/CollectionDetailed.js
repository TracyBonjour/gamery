import React, { Component } from 'react';
import axios from 'axios';
import GameSmall from './GameSmall'
class CollectionDetailed extends Component {
    
    state = { 
        collection: []
     };

    

     componentDidMount() {
        let route;

        if (this.props.category==='family-games') {
           route='https://www.boardgameatlas.com/search/?lt_min_age=8'
          }

        if (this.props.collectionId) {
          route = `https://www.boardgameatlas.com/api/search?categories=${this.props.collectionId}&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => response.data)
          .then(data => this.setState({collection: data.games}))
      }

    render() { 
        return ( 
            <div>
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