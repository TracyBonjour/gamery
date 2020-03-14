import React, { Component } from 'react';

import {Link} from 'react-router-dom';


import authService from './auth-service.js';

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",

    error: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // 1. Signup
    authService.signup(this.state.username, this.state.email, this.state.password)
      .then(() => {
        this.setState({error: ""});

        // 2. then, update with user infos
        authService.edit(this.state.username)
          .then(response => {
            this.setState({error: ""});
            
            this.props.updateUser(response);
            this.props.history.push('/');
          })
          .catch(err => {
            console.log(err)
            this.setState({error: err.response.data.message})})
      })
      .catch(err => this.setState({error: err.response.data.message}))
    ;
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  } 

  render() {
    return (
        <div className="Signup">
          <h1>Sign up</h1>
          
          <form onSubmit={this.handleSubmit}>

            {this.state.error && (
              <p className="error">{this.state.error}</p>
            )}

            <p>
              <label>
                <input className="chp" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
              </label>
              
            </p>

            <p>
              <label>
                <input className="chp" type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
              </label>
              
            </p>

            <p>
              <label>
                <input className="chp"  type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
              </label>
            </p>

            {/* <p>
              <label>
                <em>confirm password</em>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              </label>
            </p> */}

            <button className="btn" onClick={this.handleSubmit}>Create account</button>

          </form>

          <p>
            <small><Link to="/login">Already a user? Log in</Link></small>
           
          </p>

        </div>
      );
  }
}


export default Signup;