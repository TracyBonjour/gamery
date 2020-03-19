import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class GameSmall extends Component {
    state = { 
      favorite : false,
     }

     updateFav = () => {
       this.setState({
        favorite : !this.state.favorite
       })
     }

    title_short = function(title, length, ending) {
        if (length == null) {
          length = 30;
        }
        if (ending == null) {
          ending = '...';
        }
        if (title.length > length) {
          return title.substring(0, length - ending.length) + ending;
        } else {
          return title;
        }
      };

    render() { 
        
        return ( 
            <Link to={`/games/${this.props.id}`} className="link">
             <div className="game-small flex">
                <div className="game-small-row-1">
                    <img rel='norel' className='favicon' src={this.state.favorite? "/images/imagenav/baseline_star_black_48dp.png" : "/images/imagenav/baseline_star_border_black_48dp.png" } alt="" onClick={this.updateFav} />
                    <img className="game-small-img" src={this.props.img} alt=""/>
                </div>
                <h4 className="game-small-row-2">
                    {this.title_short(this.props.title)}
                </h4>
             </div>
            </Link>
         );
    }
}
 
export default GameSmall ;