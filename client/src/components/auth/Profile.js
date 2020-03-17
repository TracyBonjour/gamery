import React, { Component } from "react";

import {Link} from 'react-router-dom';
import Nav from '../Nav.js';

import authService from "./auth-service.js";

class Profile extends Component {
  logout = event => {
    authService.logout().then(response => {
      this.props.updateUser(false);
      this.props.history.push('/');
    });
  };


  handleUpload = (event) => {
    let formData = new FormData();
    formData.append('photo', event.target.files[0]);

    authService.upload(formData)
      .then(response => {
        this.props.updateUser(response);
      })
    ;
  }

  render() {
    return (
      <div className="Profile">

        <p className="titre">
          <h1>{this.props.user.username}</h1>
        </p>
        
        <p>
        <form>
          <label>
            <img className="avatar" src={this.props.user.image || "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"} />
            {/* <input type="file" name="image" onChange={this.handleUpload} /> */}
          </label>
        </form>
        </p>

        <p>
        <h3><Link to="/profileedit">Personal informations</Link></h3>
        </p>

        <h3>My collections</h3>
        <h3>Games reviewed</h3>

        <div className="cta">
          <button className="btn" onClick={this.logout}>
            logout
          </button>
        </div>
          
          <Nav></Nav>

      </div>
    );
  }
}

export default Profile;
