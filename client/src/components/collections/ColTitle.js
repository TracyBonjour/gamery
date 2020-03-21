import React, { Component } from 'react';

class ColTitle extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            req.user.collections?
            <div className='flex'>
                <div>
                    <h2>{this.props.colTitle}</h2>
                </div>
                <div>
                <p>❯</p>
                </div>
            </div>
            :
            <div><h2>No collections yet, click below to start a new collection</h2></div>
           <div className="flex">
               <img src="" alt=""/>
               <img src="" alt=""/>
           </div>
            </div>
            );
    }
}
 
export default ColTitle;