import React, { Component } from 'react';
import axios from 'axios';

class GameDetailed extends Component {
    
    state = { 
        game: {
        },
        user: {},

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

      age="Age: " +  (typeof this.state.game.min_age === 'number' ? this.state.game.min_age + "+" : "Not mentioned");
      rating="Rating: " + (this.state.game.average_user_rating ? Math.round(this.state.game.average_user_rating*100)/100 +"/5":"No rating yet");
      players= this.state.game.min_players && this.state.game.max_players ? (this.state.game.min_players + " - " + this.state.game.max_players + " players") : "No players info"

    render() { 
        return ( 
            <div>
                <h1>{this.state.game.name}</h1>
                <img className="game-medium-img" src={this.state.game.image_url} alt={this.state.game.name}/>
                <div className="game-medium-row-3">
                    {this.state.game.description_preview}
                </div>
                <div className="game-medium-row-4 flex">
                <div className="game-medium-column-1">
                    {this.rating}
                </div>
                <div className="game-medium-column-2">
                {this.age}
                </div>
                <div className="game-medium-column-3">
                    {this.players}
                </div>
             </div>
                </div>

         );
    }
}
 
export default GameDetailed;