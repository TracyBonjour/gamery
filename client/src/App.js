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
import CollectionListing from './components/catalogue/CollectionListing';
import GameDetailed from './components/catalogue/GameDetailed';
import CollectionDetailed from './components/catalogue/CollectionDetailed'

import MyCollections from './components/collections/MyCollections'
import EditCollections from './components/collections/EditCollections'

class App extends Component {
  state = {
    user: {}
  }

  fetchUser = () => {
    if (!this.state.user._id) {
      authService.loggedin()
        .then(data => this.setState({user: data}))
        .catch(err => this.setState({user: {}}))
      ;
    } else {
      console.log('user already in the state')
    }
  };

  updateUser = (data) => {
    this.setState({user: data});
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <Route render={props => (
        <div className="App" data-route={props.location.pathname}> {/* data-route="/" allow us to style pages */}

          <Switch>
            <Route exact path="/" render={(props) => (
              <Homepage user={this.state.user} />
            )} />

            <Route exact path="/signup" render={(props) => (
              <Signup updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/login" render={(props) => (
              <Login updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/profile" render={(props) => (
              <Profile user={this.state.user} updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/profileedit" render={(props) => (
              <Profileedit user={this.state.user} updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/categories" component={CollectionListing}/>
            )} /> 

            <Route exact path="/categories/:id/:name" render={props => {
                return (
                  <CollectionDetailed collectionId={props.match.params.id} colTitle={props.match.params.name}/>
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
              <MyCollections history={props.history} user={this.state.user} />
            )} />

            <Route exact path="/:id/collections/edit" render={(props) => (
              <EditCollections history={props.history} />
            )} />


            {/* last route, ie: 404 */}
            <Route render={() => (<h1>Not Found</h1>)} />
          </Switch>
          <Nav></Nav>
        </div>
      )} />
    );
  }
}

export default App;
