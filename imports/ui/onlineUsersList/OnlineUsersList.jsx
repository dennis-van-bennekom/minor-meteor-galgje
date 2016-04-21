import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import './OnlineUsersList.css';

class OnlineUsersList extends Component {
  
  handleChallenge(userId, event) {
    event.preventDefault();
    
    const word = this.refs.wordInput.value.trim();

    this.refs.wordInput.value = '';

    Meteor.call('games.insert', userId, word);
  }

  renderUserList() {
    return this.props.onlineUsers.map((user) => {
      return (
        <div className="user" key={user._id}>
          <span className="username">{user.username}</span>

          { this.props.currentUser ?
            <button
              onClick={this.handleChallenge.bind(this, user._id)}>
              Challenge!
            </button>
            : ''
          }
        </div>
      );
    });
  }

  render() {
    this.renderUserList();

    return (
      <section className="userlist">
        { this.props.currentUser ?
            <div>
              <h1>Word input</h1>
              <input type="text" ref="wordInput" />
             </div>
          : '' 
        }
      
        <h2>Online</h2>

        <div className="list">
          { this.renderUserList() }
        </div>
      </section>
    )
  }
}

OnlineUsersList.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, OnlineUsersList);
