import { Accounts } from 'meteor/accounts-base';

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    user.isPlaying = false;
    user.gameId = '';
    
    return user;
  });
}