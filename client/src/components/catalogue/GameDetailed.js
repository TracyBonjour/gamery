import React, { Component } from 'react';
import axios from 'axios';

class GameDetailed extends Component {
    
    state = { 
        game: {},
        user: {}
     };

     componentDidMount() {
        let route;
        if (this.props.gameId) {
          route = `https://www.boardgameatlas.com/api/search?ids=${this.props.gameId}&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => response.data)
          .then(data => this.setState({game: data.games[0]}))
      }

    render() { 
        return ( 
            <div>
                <h1>Title: {this.state.game.name}</h1>
                <img src={this.state.game.image_url} alt={this.state.game.name}/>
                </div>

         );
    }
}
 
export default GameDetailed;