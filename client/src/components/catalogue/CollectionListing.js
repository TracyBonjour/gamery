import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import CollectionSmall from './CollectionSmall'

const imgsMap = {
    'abstract': 'https:///img.ur/s/asdlfkasjh.png',
    'adventure': ''
}

class CollectionListing extends Component {
    state = { 
        categories: []
     }

    componentDidMount = () => {
        axios.get('https://www.boardgameatlas.com/api/game/categories?client_id=FWG6FKSO4N')
          .then(response=> response.data.categories.filter(function(cat) {
            return (
                cat.name === "Abstract" || 
                cat.name === "Adventure" ||
                cat.name === "Animals" ||
                cat.name === "Bluffing" ||
                cat.name === "Card game" ||
                cat.name === "City building" ||
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
                cat.name === "Party game" ||
                cat.name === "Puzzle" ||
                cat.name === "RPG" ||
                cat.name === "Sci-Fi" ||
                cat.name === "Strategy" ||
                cat.name === "Solo/Solitaire" ||
                cat.name === "Wargame" ||
                cat.name === "Western" ||
                cat.name === "Zombies"
            );
        }))
        .then(filter => this.setState({categories: filter}))
      }

      ;

    render() { 
        return ( 
            <div className = "clp">

            <img src={imgsMap[catname]} />

                <h1>All categories</h1>
                <div className="listing">
                    {this.state.categories.map(cat => {return(
                        <CollectionSmall type="category" link={cat.id} colTitle={cat.name} src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg" />
                     )})}
                </div>
                </div>
         );
    }
}
 
export default CollectionListing;