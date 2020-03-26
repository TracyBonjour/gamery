import React, { Component } from 'react';
import { MyContext } from '../MyContext'
import axios from 'axios';

class ColTitle extends Component {
    state = {  }

    componentDidMount() {
        axios.get('/collections')
          .then(response=> response.data)
          .then(data => this.setState({collection: data}))
      }

    render() { 
        return ( 
            <div>
            {this.context.user.collections?
            <div className='flex'>
                <div>
                    <h2>{this.props.colTitle}</h2>
                </div>
                <div>
                <p>❯</p>
                </div>
            </div>
            :
            <div><h2>No collections yet, click below to start a new collection</h2></div>}
           <div className="flex">
               <img src="" alt=""/>
               <img src="" alt=""/>
           </div>
            </div>
            );
    }
}
ColTitle.contextType = MyContext;
export default ColTitle;