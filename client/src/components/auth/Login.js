import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import Button from '../Button';

import authService from './auth-service.js';

class Login extends Component {
  state = {
    email: "",
    password: "",

    error: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    authService.login(this.state.email, this.state.password)
      .then(response => {
        this.setState({error: ""});

        this.props.updateUser(response);
        this.props.history.push('/');
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
        <div className="Login">
          <h1>Log in</h1>
          
          <form onSubmit={this.handleSubmit}>

            {this.state.error && (
              <p className="error">{this.state.error}</p>
            )}

            <p className="chp">
              <label>
                email
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
              </label>
            </p>

            <p className="chp">
              <label>
                password
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              </label>
            </p>

            <p>
              <label>
                <input type="checkbox" id="remember" name="xxxxx" value="remember"/>
                Remember me
             </label>
            </p>

            {/* <button className="btn" onClick={this.handleSubmit}>Login</button> */}
            <Button>login</Button>

          </form>

          <p>
            <small><Link to="/signup">New here ? Create account</Link></small>
          </p>
        </div>

    );
  }
}

export default Login;