import React, { Component } from "react";
import GameMedium from "./GameMedium.js";
import axios from "axios";


// import Button from './Button'
// import {Link} from 'react-router-dom'

class SearchDetail extends Component {
  state = {
    //dans games la donnée de l api
    games: [],
   // query: "",
    minage: "",
    maxage: "",
    players: "",
    time: "",
    rating: "",
    categories: [],
    select_cat: ""
   // collection: []
  };


  handleSubmit = (event) => {
    event.preventDefault();
    let route;

    //if ((this.state.minage) || (this.state.maxage) || (this.state.players) || (this.state.time) || (this.state.rating) ) {
      route = `https://www.boardgameatlas.com/api/search?q=""&limit=30&lt_min_age=${this.state.minage}&gt_min_age=${this.state.maxage}&lt_min_players=${this.state.players}&gt_max_players=${this.state.players}&lt_max_playtime=${this.state.time}&gt_average_user_rating=${this.state.rating}&categories=${this.state.select_cat}&client_id=FWG6FKSO4N `;
   // }
    axios
      .get(route)
      .then(response => response.data)
      .then(data => this.setState({games:data.games}))
      // .catch(err => this.setState({games: false}))
      // ;

    // if (!this.state.game) { // (this.state.game === undefined)
    //     alert("Sorry, your search didn't return any result");
    //     this.props.history.push('/');
    // }


  };
  


  componentDidMount = () => {
    axios
      .get(
        "https://www.boardgameatlas.com/api/game/categories?client_id=FWG6FKSO4N"
      )
      .then(response =>
        response.data.categories.filter(function(cat) {
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
        })
      )
      .then(filter => this.setState({ categories: filter }));
  };

  // handleQuery = ev => {
  //   this.setState({
  //     query: ev.target.value
  //   });
  // };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(event.target.name + event.target.value)
    this.setState({ [name]: value });
  };

  resetState = () => {
    this.setState(
    {
        //dans games la donnée de l api
        games: [],
       // query: "",
        minage: "",
        maxage: "",
        players: "",
        time: "",
        rating: ""
       // collection: []
      });
    }

  render = () => {
    // let games = this.state.games;
    // const query = this.state.query;

    // if (query) {
    //     games = games.filter(game => game.name.includes(query))
    // }

    return (
      <div className="flex-column block-container">
      <div className="searchdetail flex-column">
        <h1 className="center">Search game</h1>
      {this.state.games.length===0?
        <form className="flex-column center" onSubmit={this.handleSubmit}>

        <h3>Minimum age : {this.state.minage} </h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="minage"
            type="range"
            min="4"
            max="21"
            value={this.state.minage}
            onChange={this.handleChange}
          />
        </div>

        <h3> Maximum age : {this.state.maxage} </h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="maxage"
            type="range"
            min="2"
            max="21"
            value={this.state.maxage}
            onChange={this.handleChange}
          />
        </div>

        <h3>Players : {this.state.players} </h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="players"
            type="range"
            min="2"
            max="15"
            value={this.state.players}
            onChange={this.handleChange}
          />
        </div>
        

        <h3> Playtime (minutes) : {this.state.time} </h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="time"
            type="range"
            min="15"
            max="360"
            value={this.state.time}
            onChange={this.handleChange}
          />
        </div>

        <h3>Rating : {this.state.rating} <img className="fav" src="/images/imagenav/baseline_star_white_48dp.png" width="45" height="45" alt="fav" /> </h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="rating"
            type="range"
            min="0"
            max="4"
            value={this.state.rating}
            onChange={this.handleChange}
          />
        </div>

        <h3>Category :</h3>
          
          <select className="customselect" name="select_cat" onChange={this.handleChange}>
            <option >--Please choose an category--</option>
            { this.state.categories.length>=1? this.state.categories.map(cat => {
              return <option value={cat.id}>{cat.name}</option> 
            }) : "categories" }
          </select>

          <button className="btn" onClick={this.handleSubmit.bind(this)}>
            Search games
          </button>
        </form>
        : <button className="btn" onClick={this.resetState}>Start new search</button> 
      }
      </div>
      <div className = "searchlist">
        {this.state.games
          ? this.state.games.map(game => {
              return (
                <GameMedium
                  fav={true}
                  title={game.name}
                  img={game.images.small}
                  id={game.id}
                  description={game.description_preview}
                  age={
                    "Age: " +
                    (game.min_age ? game.min_age + "+" : "Not mentioned")
                  }
                  rating={
                    "Rating: " +
                    (game.average_user_rating
                      ? Math.round(game.average_user_rating * 100) / 100 + "/5"
                      : "No rating yet")
                  }
                  players={
                    game.min_players && game.max_players
                      ? game.min_players + " - " + game.max_players + " players"
                      : "No players info"
                  }
                />
              );
            })
          : "Start typing to see results"}
      </div>
      </div>
    );
  }
}

export default SearchDetail;
