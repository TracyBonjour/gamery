import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import CollectionSmall from './CollectionSmall'

class CollectionListing extends Component {
    // state = { 
    //     blocks: [1, 2, 3, 4],
    //  }

    // componentDidMount() {
    //     axios.get('https://www.boardgameatlas.com/api/search?client_id=FWG6FKSO4N')
    //       .then(response=> response.data)
    //       .then(data => this.setState({blocks: data}))
    //   }

    render() { 
        return ( 
            <div className = "clp">
                <h1>All categories</h1>
                <h2>By complexity</h2>
                {/* <div className="listing">
                    {this.state.blocks.map(block => {return(
                        <CollectionSmall colTitle='test' src={this.props.src}/>
                     )})}
                </div> */}
                </div>
         );
    }
}
 
export default CollectionListing;