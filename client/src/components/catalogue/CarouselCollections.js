import React, { Component } from 'react';
import GameSmall from './GameSmall'
import axios from 'axios';
import {Link} from 'react-router-dom'

class CarouselCollections extends Component {
    state = { 
        blocks: [],
     }

    componentDidMount() {
        axios.get('https://www.boardgameatlas.com/api/search?name=Catan&pretty=true&client_id=FWG6FKSO4N')
          .then(response=> response.data)
          .then(data => this.setState({blocks: data.games}))
      }

    render() { 
        return ( 
            <div className="carousel">
                <h3>{this.props.header}</h3>
                <div className="carousel-container">
                    {this.state.blocks.map(block => {return(
                        <GameSmall title={block.name} age={block.min_age} img={block.images.small}/>
                     )})}
                </div>
            </div>
         );
    }
}
 
export default CarouselCollections;