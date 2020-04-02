import React, { Component } from 'react';

class Review extends Component {
    state = {  }
    render() { 
        return ( 
<div className="flex-column">
                <div className="review-row-1 flex">
                <div className="review-column-1">
                    <p>By: {this.props.review_username}</p>
                </div>
                <div className="review-column-2">
               <p>Rating:  {this.props.review_rating}</p> 
                </div>
                </div>
                <div className="review-row-2">
                    <div className="padding-bottom">{this.props.review_desc}</div>
                <hr/>
                </div>

             </div>

         );
    }
}
 
export default Review;
