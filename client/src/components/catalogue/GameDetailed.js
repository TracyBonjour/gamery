import React, { Component } from 'react';
import axios from 'axios';

class GameDetailed extends Component {
   
    state = { 
        game: {},
        user: {}
     };

     componentDidMount() {
        console.log(this.props)

        let route;
        if (this.props.gameId) {
          route = `https://www.boardgameatlas.com/api/search?id=${this.props.gameId}&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => console.log(response.data))
          .then(response => response.data)
          .then(data => this.setState({game: data.games}))
      }

    render() { 
        return ( 
            <div>
                <p>test</p>
                <h1>Title: {this.state.game.title}</h1>
                {/* <img src={this.state.images.medium} alt=""/> */}
                </div>

         );
    }
}
 
export default GameDetailed;