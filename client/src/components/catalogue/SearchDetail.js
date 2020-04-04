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
    categories: []
   // collection: []
  };


  handleSubmit = (event) => {
    event.preventDefault();
    let route;

    //if ((this.state.minage) || (this.state.maxage) || (this.state.players) || (this.state.time) || (this.state.rating) ) {
      route = `https://www.boardgameatlas.com/api/search?q=""&limit=30&lt_min_age=${this.state.minage}&gt_min_age=${this.state.maxage}&lt_min_players=${this.state.players}&gt_max_players=${this.state.players}&lt_max_playtime=${this.state.time}&gt_average_user_rating=${this.state.rating}&client_id=FWG6FKSO4N `;
   // }
    axios
      .get(route)
      .then(response => response.data)
      .then(data => this.setState({games:data.games}))


  };



  // componentDidMount = () => {
  //   axios
  //     .get(
  //       "https://www.boardgameatlas.com/api/game/categories?client_id=FWG6FKSO4N"
  //     )
  //     .then(response =>
  //       response.data.categories.filter(function(cat) {
  //         return (
  //           cat.name === "Abstract" ||
  //           cat.name === "Adventure" ||
  //           cat.name === "Animals" ||
  //           cat.name === "Bluffing" ||
  //           cat.name === "Card Game" ||
  //           cat.name === "City Building" ||
  //           cat.name === "Cooperative" ||
  //           cat.name === "Deduction" ||
  //           cat.name === "Dice" ||
  //           cat.name === "Educational" ||
  //           cat.name === "Family Game" ||
  //           cat.name === "Farming" ||
  //           cat.name === "Horror" ||
  //           cat.name === "Humor" ||
  //           cat.name === "Medieval" ||
  //           cat.name === "Memory" ||
  //           cat.name === "Mythology" ||
  //           cat.name === "Party Game" ||
  //           cat.name === "Puzzle" ||
  //           cat.name === "RPG" ||
  //           cat.name === "Sci-Fi" ||
  //           cat.name === "Strategy" ||
  //           cat.name === "Wargame" ||
  //           cat.name === "Western" ||
  //           cat.name === "Zombies"
  //         );
  //       })
  //     )
  //     .then(filter => this.setState({ categories: filter }));
  // };

  // handleQuery = ev => {
  //   this.setState({
  //     query: ev.target.value
  //   });
  // };

  handleChange = event => {
    const { name, value } = event.target;
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
        rating: "",
        categories: []
       // collection: []
      });
    }

  render() {
    // let games = this.state.games;
    // const query = this.state.query;

    // if (query) {
    //     games = games.filter(game => game.name.includes(query))
    // }

    return (
      <div className="searchdetail">
        <h1>Search game</h1>
      {this.state.games.length===0?
        <form onSubmit={this.handleSubmit}>

        <h3>Less than : {this.state.minage} years </h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="minage"
            type="range"
            min="4"
            max="100"
            id="myRange"
            value={this.state.minage}
            onChange={this.handleChange}
          />
        </div>

        <h3>Over : {this.state.maxage} years </h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="maxage"
            type="range"
            min="2"
            max="100"
            id="myRange"
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
            max="100"
            id="myRange"
            value={this.state.players}
            onChange={this.handleChange}
          />
        </div>
        {/* <li>
          <labe>
            <input
            className="mr"
            name="players"
            type="checkbox"
            min="1"
            value={this.state.players}
            onChange={this.handleChange}
            />
            <span>1</span>
          </labe>
        </li>
        <li>
          <labe>
            <input
            className="mr"
            name="players"
            type="checkbox"
            min="2"
            value={this.state.players}
            onChange={this.handleChange}
            />
            <span>2</span>
          </labe>
        </li>
        <li>
          <labe>
            <input
            className="mr"
            name="players"
            type="checkbox"
            min="3"
            value={this.state.players}
            onChange={this.handleChange}
            />
            <span>3</span>
          </labe>
        </li> */}

        <h3>Play time, less than : {this.state.time} min</h3>

        <div className="slidecontainer">
          <input
            className="slider"
            name="time"
            type="range"
            min="15"
            max="360"
            id="myRange"
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
            id="myRange"
            value={this.state.rating}
            onChange={this.handleChange}
          />
        </div>

        {/* <h3>Category :</h3>
        <input
          className="mr"
          name="collection"
          type="text"
          value={this.state.collection}
          onChange={this.handleChange}
        /> */}

        {/* <p>
          <select name="categories">
                        

                        <option value={this.state.categories} > {this.state.categories.map(cat => {return(
                        <CategorySmall id={cat.id} colTitle={cat.name}/>
                        )})}</option>

                    </select>
          <select name="categories" onChange={this.handleChange}>
            <option value="categories">--Please choose an category--</option>
            {this.state.categories.map(cat => {
              return <option value={cat.id}>{cat.name}</option>;
            })}
          </select>
        </p> */}
        <p></p>

          <button className="btn" onClick={this.handleSubmit.bind(this)}>
            Search games
          </button>
        </form>
        : <button className="btnfixed" onClick={this.resetState}>Start new search</button> 
      }
        {this.state.games
          ? this.state.games.map(game => {
              return (
                <GameMedium
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
          : "Staping to see result"}
      </div>
    );
  }
}

export default SearchDetail;
