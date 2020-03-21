import React, { Component } from 'react';
import ColTitle from './ColTitle';
import {Link} from 'react-router-dom';

class MyCollections extends Component {
    state = { 
        user:{username:'testuser', collections:[]}
     }

    addCollection = () => {
        
    }
    render() { 
        return ( 
            <div>
            {this.state.user.collections===[]?
            <div className="listing">
                    {this.state.user.collections.map(col => {return(
                       <ColTitle colTitle={col.colTitle}/>
                     )})}
            </div>
            :
            <div><h2>No collections yet, click below to start a new collection</h2></div>}
           <div className="flex">
               <img className='icon' onClick={this.addCollection} src="/images/icons/plus_icon_white.png" alt=""/>
               <Link to={`/${this.state.user.username}/collections/edit`}><img className='icon' src="/images/icons/edit_icon_white.png" alt=""/></Link>
           </div>
            </div>
            );


        
    }
}
 
export default MyCollections;