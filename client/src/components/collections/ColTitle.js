import React, { Component } from 'react';
import { MyContext } from '../MyContext'
import axios from 'axios';
import { Link } from "react-router-dom";

class ColTitle extends Component {

    state = {
        collection: {}
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_APIURL || ""}/api/user/collections/${this.props.id}`, )
          .then(response=> response.data)
          .then(data => this.setState({collection: data}))
      }

    render() { 
        return ( 

            <Link to={`/${this.context.user.username}/collections/${this.state.collection._id}/${this.state.collection.colTitle}`} className='flex'>
                <div>
                    <h2>{this.props.colTitle}</h2>
                </div>
                <div>
                <p>❯</p>
                </div>
            </Link>
            );
    }
}
ColTitle.contextType = MyContext;
export default ColTitle;