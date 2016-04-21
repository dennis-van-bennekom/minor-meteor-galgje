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
    check(word, String);
    
    word = word.toLowerCase();

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    if (Meteor.users.findOne(this.userId).isPlaying ||
        Meteor.users.findOne(user).isPlaying) {
      throw new Meteor.Error('not-authorized');      
    }
    
    if (word.length === 0 || word.length > 20) {
      return;
    }
    
    if  (!/^[a-z]+$/.test(word)) {
      return;
    }

    var gameId = Games.insert({
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
      guessed: [],
      turns: 10,
      state: 'playing'
    });
    
    Meteor.users.update(user, { $set: { 'isPlaying': true, 'gameId': gameId } });
    Meteor.users.update(this.userId, { $set: { 'isPlaying': true, 'gameId': gameId } });
  },

  'games.remove'(gameId) {
    check(gameId, String);

    const game = Games.findOne(gameId);

    if (game.challenger.id !== this.userId && game.player.id !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Meteor.users.update(game.challenger.id, { $set: { 'isPlaying': false, 'gameId': '' } });
    Meteor.users.update(game.player.id, { $set: { 'isPlaying': false, 'gameId': '' } });

    Games.remove(gameId);
  },
  
  'games.guess'(gameId, letter) {
    check(gameId, String);
    check(letter, String);
    
    const game = Games.findOne(gameId);
    let guessed = game.guessed;
    let turns = game.turns;
    const word = game.word;
    
    if (game.player.id !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    if (letter.length !== 1) {
      return;
    }
    
    if (guessed.indexOf(letter) !== -1) {
      return;
    }
    
    guessed.push(letter);
    
    if (word.indexOf(letter) === -1) {
      if (turns > 1) {
        turns -= 1;
      } else {
        Games.update(gameId, { $set: { 'state': 'lost' } });
      }
    }
    
    const won = word.split('').filter(l => {
        return guessed.indexOf(l) !== -1 ? false : true;
    }).length === 0;
    
    if (won) {
      Games.update(gameId, { $set: { 'state': 'won' } });
    }
    
    Games.update(gameId, { $set: { 
      'guessed': guessed,
      'turns': turns
    } });
  }
});
