import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class CollectionSmall extends Component {
    state = {  }
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
            <Link className="link">
             <div className="collection-small flex">
                <div className="collection-small-row-1">
                    <img className="collection-small-img" src={this.props.src} alt=""/>
                </div>
                <div className="collection-small-row-2">
                    {this.title_short(this.props.colTitle)}
                </div>
             </div>
            </Link>
         );
    }
}
 
 
export default CollectionSmall;