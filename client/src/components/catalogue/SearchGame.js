import React, { Component } from 'react';
import GameMedium from './GameMedium.js';
import axios from 'axios';

// import Button from './Button'
// import {Link} from 'react-router-dom'

class SearchGame extends Component {
    state = {  
        //dans games la donnée de l api
        games: [],
        query: '',
        minplayers: ''
    }
    
    componentDidUpdate = () => {
        let route;

        if (this.state.query) {
          route = `https://www.boardgameatlas.com/api/search?name=${this.state.query}&fuzzy_match=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => response.data)
          .then(data => this.setState({games: data.games}));

        if (this.state.query) {
           route = `https://www.boardgameatlas.com/api/search?min_players=${this.state.minplayers}&fuzzy_match=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => response.data)
          .then(data => this.setState({minplayers: data.minplayers}));
    }


    handleQuery = (ev) => {
        this.setState({
          query: ev.target.value
        })
    }

    addToMinplayers = () => {
        this.setState({
            minplayers: this.state.minplayers
        })
    }

    render() { 

        // let games = this.state.games;
        // const query = this.state.query;

        // if (query) {
        //     games = games.filter(game => game.name.includes(query))
        // }

        return ( 
            <div className="Searchgame">
                
                <h1>Search game</h1>
                <input type="search" value={this.state.query} onChange={this.handleQuery} />
                  { this.state.games ? (this.state.games.map(game => {return(
                        <GameMedium 
                        title={game.name} 
                        img={game.images.small} 
                        id={game.id} 
                        description={game.description_preview} 
                        age={ "Age: " +  (game.min_age ? game.min_age + "+" : "Not mentioned")}
                        rating={"Rating: " + (game.average_user_rating ? Math.round(game.average_user_rating*100)/100 +"/5":"No rating yet") } 
                        players={game.min_players && game.max_players ? (game.min_players + " - " + game.max_players + " players") : "No players info"}
                        />
                     )})) : 'Staping to see result'}
                <ul>
                    <strong>Minimun Players</strong>
                </ul>
                <ul>
                <li>
                  <label>
                    <input className="mr" type="checkbox" value={this.state.minplayers} onChange={this.addToMinplayers} />
                    <span>1</span>
                  </label>
                </li>
                </ul>



            </div>
         );
    }
}
 
export default SearchGame;