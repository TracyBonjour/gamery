import React, { Component } from "react";

import {Link} from 'react-router-dom';

import authService from "./auth-service.js";

class Profile extends Component {
  logout = event => {
    authService.logout().then(response => {
      this.props.updateUser(false);
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

        <p className="chp">
          username 
          <span>{this.props.user.username}</span>
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
        <h1><Link to="/profileedit">Personal informations</Link></h1>
        </p>

        <h1>My collections</h1>
        <h1>Games reviewed</h1>

        <div className="cta">
          <button className="btnwith" onClick={this.logout}>
            logout
          </button>
        </div>


      </div>
    );
  }
}

export default Profile;
