import React, { Component } from 'react';

import authService from './auth-service.js';


class Profile extends Component  {

  logout = (event) => {
    authService.logout()
      .then(response => {
        this.props.updateUser(false);
      })
    ;
  }

  render() {
    return (

            <>
              <h1>Profile</h1>
              
              <p>
                <em>Username : </em>
                <span>{this.props.user.username}</span>
              </p>
              <p>
                <em>Email</em>
                <span>{this.props.user.email}</span>
              </p>

              <p>
                <em>Password : </em>
                <span>{this.props.user.password}</span>
              </p>

              <div className="cta">
                <button className="btn logout" onClick={this.logout}>Logout</button>
              </div>

            </>
        
    
    );
  }
}


export default Profile;