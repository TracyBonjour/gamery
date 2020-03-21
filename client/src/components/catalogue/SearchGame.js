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
        minage: null,
        maxage: null,
        players: null,
        time: null,
        rating: null // info non presente dans search api
    }
    
    componentDidUpdate = () => {
        let route;

        if (this.state.query) {
          route = `https://www.boardgameatlas.com/api/search?name=${this.state.query}&fuzzy_match=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => response.data)
          .then(data => this.setState({games: data.games}));

        if (this.state.minage) {
            route = `https://www.boardgameatlas.com/api/search?lt_min_age=${this.state.minage}&fuzzy_match=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
           .then(response => response.data)
           .then(data => this.setState({games: data.games}));

        if (this.state.maxage) {
            route = `https://www.boardgameatlas.com/api/search?gt_min_age=${this.state.maxage}&fuzzy_match=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
           .then(response => response.data)
           .then(data => this.setState({games: data.games}));

        if (this.state.players) {
           route = `https://www.boardgameatlas.com/api/search?lt_min_players=${this.state.players}&gt_max_players=${this.state.players}&fuzzy_match=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
          .then(response => response.data)
          .then(data => this.setState({games: data.games}));

        if (this.state.time) {
            route = `https://www.boardgameatlas.com/api/search?lt_max_playtime=${this.state.time}&fuzzy_match=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
           .then(response => response.data)
           .then(data => this.setState({games: data.games}));
        
        if (this.state.rating) {
            route = `https://www.boardgameatlas.com/api/search?gt_average_user_rating=${this.state.rating}=true&client_id=FWG6FKSO4N `
        }
        axios.get(route)
           .then(response => response.data)
           .then(data => this.setState({games: data.games}));
    }


    handleQuery = (ev) => {
        this.setState({
          query: ev.target.value
        })
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
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

                <h3>Age, - de :</h3>
                    <input className="mr" name="minage" type="number" value={this.state.minage} onChange={this.handleChange} />

                <h3>Age, + de :</h3>
                    <input className="mr" name="maxage" type="number" value={this.state.maxage} onChange={this.handleChange} />

                <h3>Players</h3>
                    <input className="mr" name="players" type="number" value={this.state.players} onChange={this.handleChange} />

                <h3>Play time, - de :</h3>
                    <input className="mr" name="time" type="number" value={this.state.time} onChange={this.handleChange} />

                <h3>Rating :</h3>
                    <input className="mr" name="rating" type="number" value={this.state.time} onChange={this.handleChange} />

   



            </div>
         );
    }
}
 
export default SearchGame;