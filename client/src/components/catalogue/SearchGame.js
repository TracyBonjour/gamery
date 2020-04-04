import React, { Component } from 'react';
import GameMedium from './GameMedium.js';
import axios from 'axios';
import CategorySmall from './CategorySmall';

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
        rating: null, 
        categories: []
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

        // if (this.state.categories) {
        //     // route = `https://www.boardgameatlas.com/api/search?categories=${this.state.categories}=true&client_id=FWG6FKSO4N `
        //     route = `https://www.boardgameatlas.com/api/game/categories?client_id=FWG6FKSO4N`
        // }
        // axios.get(route)
        //    .then(response => response.data)
        //    .then(data => this.setState({games: data.games}));
    }

    componentDidMount = () => {
        axios.get('https://www.boardgameatlas.com/api/game/categories?client_id=FWG6FKSO4N')
          .then(response=> response.data.categories.filter(function(cat) {
            return (
                cat.name === "Abstract" || 
                cat.name === "Adventure" ||
                cat.name === "Animals" ||
                cat.name === "Bluffing" ||
                cat.name === "Card Game" ||
                cat.name === "City Building" ||
                cat.name === "Cooperative" ||
                cat.name === "Deduction" ||
                cat.name === "Dice" ||
                cat.name === "Educational" ||
                cat.name === "Family Game" ||
                cat.name === "Farming" || 
                cat.name === "Horror" ||
                cat.name === "Humor" ||
                cat.name === "Medieval" ||
                cat.name === "Memory" ||
                cat.name === "Mythology" ||
                cat.name === "Party Game" ||
                cat.name === "Puzzle" ||
                cat.name === "RPG" ||
                cat.name === "Sci-Fi" ||
                cat.name === "Strategy" ||
                cat.name === "Wargame" ||
                cat.name === "Western" ||
                cat.name === "Zombies"
            );
        }))
        .then(filter => this.setState({categories: filter}))
      };


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
                
                <div className="slidecontainer">
                    <input className="slider" name="time" type="number" min="1" max="300" id="myRange" value={this.state.time} onChange={this.handleChange} />
                </div>

                <div class="slidecontainer">
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                </div>

                <h3>Rating :</h3>
                    <input className="mr" name="rating" type="number" value={this.state.rating} onChange={this.handleChange} />

                <h3>Category :</h3>

                <p>
                    {/* <select name="categories">
                        

                        <option value={this.state.categories} > {this.state.categories.map(cat => {return(
                        <CategorySmall id={cat.id} colTitle={cat.name}/>
                        )})}</option>

                    </select> */}
                    <select name="categories" onChange={this.handleChange}>
                        <option value="categories">--Please choose an category--</option>
                        {this.state.categories.map(cat => {
                        return(
                        <option value={cat.id} >{cat.name}</option>
                        
                        ) 
                        })}
                        {/* {return(<CategorySmall id={cat.id} colTitle={cat.name}/>)} */}
                    
                    </select>
                </p>

                {/* <div className="listing">
                        {this.state.categories.map(cat => {return(
                        <CategorySmall id={cat.id} colTitle={cat.name}/>
                        )})}
                    </div> */}


            </div>
         );
    }
}
 
export default SearchGame;