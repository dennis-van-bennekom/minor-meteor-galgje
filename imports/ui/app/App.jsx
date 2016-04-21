import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../accountsUIWrapper/AccountsUIWrapper.jsx';
import Game from '../game/Game.jsx';
import OnlineUsersList from '../onlineUsersList/OnlineUsersList.jsx';

import './App.css';

class App extends Component {

  render() {
    return (
      <div class="container">
        <header>
          <AccountsUIWrapper />
        </header>
        
        { this.props.isPlaying ? 
          <Game gameId={this.props.gameId} /> :
          <OnlineUsersList onlineUsers={this.props.onlineUsers} />
        }
      </div>
    );
  }
}

App.propTypes = {
  onlineUsers: PropTypes.array.isRequired,
  isPlaying: PropTypes.bool,
  gameId: PropTypes.string
};

export default createContainer(() => {
  Meteor.subscribe('onlineUsers');
  
  let isPlaying = false;
  let gameId = '';
  
  if (Meteor.user()) {
    isPlaying = Meteor.user().isPlaying;
    gameId = Meteor.user().gameId;
  }
  
  return {
    onlineUsers: Meteor.users.find({
      _id: { $ne: Meteor.userId() },
      isPlaying: { $ne: true }
    }).fetch(),
    isPlaying: isPlaying,
    gameId: gameId
  };
}, App);
