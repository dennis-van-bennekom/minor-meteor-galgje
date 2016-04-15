import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../accountsUIWrapper/AccountsUIWrapper.jsx';
import OnlineUsersList from '../onlineUsersList/OnlineUsersList.jsx';

import './App.css';

class App extends Component {
  handleCreateWord(event) {
    event.preventDefault();

    const word = this.refs.wordInput.value.trim();

    this.refs.wordInput.value = '';
  }

  render() {
    return (
      <div class="container">
        <header>
          <AccountsUIWrapper />
        </header>

        <OnlineUsersList onlineUsers={this.props.onlineUsers} />
      </div>
    );
  }
}

App.propTypes = {
  onlineUsers: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('onlineUsers');

  return {
    onlineUsers: Meteor.users.find({
      _id: { $ne: Meteor.userId() }
    }).fetch()
  };
}, App);
