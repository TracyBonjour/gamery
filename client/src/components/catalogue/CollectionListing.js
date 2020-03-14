import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import CollectionSmall from './CollectionSmall'

class CollectionListing extends Component {
    state = { 
        categories: [],
        mechanics: []

     }

    componentDidMount = () => {
        axios.get('https://www.boardgameatlas.com/api/game/mechanics?client_id=FWG6FKSO4N')
          .then(response=> response.data)
          .then(data => this.setState({mechanics: data.mechanics}))
        axios.get('https://www.boardgameatlas.com/api/game/categories?client_id=FWG6FKSO4N')
          .then(response=> response.data)
          .then(data => this.setState({categories: data.categories}))
      }

    render() { 
        return ( 
            <div className = "clp">
                <h1>All categories</h1>
                {/* <h2>By complexity</h2> */}
                <div className="listing">
                    {this.state.categories.map(cat => {return(
                        <CollectionSmall type="category" link={cat.id} colTitle={cat.name} src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg" />
                     )})}
                     {this.state.mechanics.map(cat => {return(
                        <CollectionSmall type="mechanics" colTitle={cat.name} src="https://www.logodesignlove.com/wp-content/uploads/2019/04/extinction-symbol-01.jpg" />
                     )})}
                </div>
                </div>
         );
    }
}
 
export default CollectionListing;