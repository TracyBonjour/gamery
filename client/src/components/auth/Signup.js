import React, { Component } from 'react';

import {Link} from 'react-router-dom';


import authService from './auth-service.js';

class Signup extends Component {
  state = {
    username: "",
    //email: "",
    password: "",

    error: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // 1. Signup
    authService.signup(this.state.username, this.state.password)
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
        <>
          <h1>Sign up</h1>
          
          <form onSubmit={this.handleSubmit}>

            {this.state.error && (
              <p className="error">{this.state.error}</p>
            )}

            <p>
              <label>
                <em>Username</em>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
              </label>
              
            </p>

            {/* <p>
              <label>
                <em>Email</em>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
              </label>
              
            </p> */}

            <p>
              <label>
                <em>Password</em>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              </label>
            </p>

            <button className="btn" onClick={this.handleSubmit}>Create the account</button>

          </form>

          <p>
            <small>If you already have an account, you can login from <Link to="/login">here</Link></small>
           
          </p>

        </>
      );
  }
}


export default Signup;