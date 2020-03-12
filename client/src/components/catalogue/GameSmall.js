import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class GameSmall extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="game-small flex">
                <div className="game-small-row-1">
                    <img className="game-small-img" src={this.props.img} alt=""/>
                </div>
                <div className="game-small-row-2 flex">
                    <div className="game-small-column-1">
                    <Link>{this.props.title}</Link>
                    </div>
                    <div className="game-small-column-2">  
                        <p>{this.props.age}</p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default GameSmall ;