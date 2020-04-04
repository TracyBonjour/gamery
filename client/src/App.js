import React, { Component } from 'react';
import './App.scss';
import {Switch, Route} from 'react-router-dom';

import Homepage from './components/Homepage.js';
import Signup from './components/auth/Signup.js';
import Login from './components/auth/Login.js';
import Profileedit from './components/auth/Profileedit.js';
import Profile from './components/auth/Profile.js';
import Nav from './components/Nav.js';
import SearchGame from './components/catalogue/SearchGame.js';

import authService from './components/auth/auth-service.js';
import CategoryListing from './components/catalogue/CategoryListing';
import GameDetailed from './components/catalogue/GameDetailed';
import CategoryDetailed from './components/catalogue/CategoryDetailed'
import CollectionDetailed from './components/collections/CollectionDetailed'
import axios from 'axios'
import MyCollections from './components/collections/MyCollections'
import EditCollections from './components/collections/EditCollections'
import Foursquare from './components/Foursquare'
import { MyContext } from './components/MyContext.js'


class App extends Component {
  state = {
    user: {},
    collections: []
  }

  fetchUser = () => {
    if (!this.state.user._id) {
      authService.loggedin()
        .then(
          data => this.setState({user: data}))
        .catch(err => this.setState({user: false}))
      ;
    } else {
      console.log('user already in the state')
    }
  };

  updateUser = (data) => {
    this.setState({user: data});
    axios.create({
      withCredentials: true
    }).get(`${process.env.REACT_APP_APIURL || ""}/api/user/collections`)
    .then(response => response.data)
   //.then(data => data.map(col => col.colTitle))
       .then(data => this.setState({collections: data}))
    }

  componentDidMount() {
    this.fetchUser();
    axios.create({
      withCredentials: true
    }).get(`${process.env.REACT_APP_APIURL || ""}/api/user/collections`)
    .then(response => response.data)
   //.then(data => data.map(col => col.colTitle))
       .then(data => this.setState({collections: data}))
  }

  render() {
    return (
      <MyContext.Provider value={{ user: this.state.user, collections:this.state.collections }}>
      <Route render={props => (
        <div className="App" data-route={props.location.pathname}> {/* data-route="/" allow us to style pages */}

          <Switch>
            <Route exact path="/" render={(props) => (
              <Homepage />
            )} />

            <Route exact path="/signup" render={(props) => (
              <Signup updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/login" render={(props) => (
              <Login updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/profile" render={(props) => (
              <Profile updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/profileedit" render={(props) => (
              <Profileedit updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/categories" component={CategoryListing}/>
            )} /> 

            <Route exact path="/categories/:id/:name" render={props => {
                return (
                  <CategoryDetailed collectionId={props.match.params.id} colTitle={props.match.params.name}/>
                );
              }} />


            <Route exact path="/games/:id" render={props => {
                return (
                  <GameDetailed gameId={props.match.params.id}/>
                );
              }} />

            <Route exact path="/search" component={SearchGame}/>
            )} /> 

            <Route exact path="/:id/collections" render={(props) => (
              <MyCollections updateUser={this.updateUser} history={props.history} user={this.state.user} />
            )} />

            <Route exact path="/:id/collections/edit" render={(props) => (
              <EditCollections history={props.history} />
            )} />

            <Route exact path="/:userid/collections/:id/:name" render={(props) => (
              <CollectionDetailed collectionId={props.match.params.id} colTitle={props.match.params.name} />
            )} />

            <Route exact path="/map" render={(props) => (
              <Foursquare />
            )} />


            {/* last route, ie: 404 */}
            <Route render={() => (<h1>Not Found</h1>)} />
          </Switch>
          <Nav></Nav>
        </div>
      )} />
    </MyContext.Provider>);
  }
}

export default App;




