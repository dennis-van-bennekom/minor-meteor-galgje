import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import './OnlineUsersList.css';

class OnlineUsersList extends Component {
  handleChallenge(userId, event) {
    event.preventDefault();

    Meteor.call('games.insert', userId, 'test');
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
        <h1>Online</h1>

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
