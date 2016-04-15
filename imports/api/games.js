import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.publish('games', () => {
    return Games.find();
  });
}

Meteor.methods({
  'games.insert'(user, word) {
    check(user, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Games.insert({
      createdAt: new Date(),
      challenger: {
        id: this.userId,
        username: Meteor.users.findOne(this.userId).username
      },
      player: {
        id: user,
        username: Meteor.users.findOne(user).username
      },
      word: word,
      guessed: '',
      turns: 0
    });
  },

  'games.remove'(gameId) {
    check(gameId, String);

    const game = Games.findOne(gameId);

    if (game.challenger.id !== this.userId || game.player.id !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Games.remove(gameId);
  }
});
