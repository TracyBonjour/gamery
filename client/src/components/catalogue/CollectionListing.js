import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import CollectionSmall from './CollectionSmall'
import images from '../../images'

const imgsMap = {
    'abstract': 'https:///img.ur/s/asdlfkasjh.png',
    'adventure': ''
}

class CollectionListing extends Component {
    state = { 
        categories: []
     }

    img = () => {
        var state2=[...this.state.categories];
        state2.forEach((cat,i) => cat.image= images[i].src)
        this.setState({categories:state2})
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
        .then(
            this.img
        )
      }

      ;

    render() { 
        return ( 
            <div className = "clp">
                <h1>All recommended categories</h1>
                <div className="listing">
                    {this.state.categories.map(cat => {return(
                        <CollectionSmall type="category" link={cat.id} colTitle={cat.name} src={cat.image} />
                     )})}
                </div>
                </div>
         );
    }
}
 
export default CollectionListing;