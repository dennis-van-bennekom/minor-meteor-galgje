import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../../api/games.js';

import './Game.css';

class Game extends Component {
  
  handleGuess(event) {
    event.preventDefault();
    
    const guess = this.refs.letterInput.value.trim();
    
    Meteor.call('games.guess', this.props.game._id, guess);
    
    this.refs.letterInput.value = '';
  }
  
  end(event) {
    event.preventDefault();
    
    Meteor.call('games.remove', this.props.game._id);
  }
  
  word() {
    let word = this.props.game.word;
    const guessed = this.props.game.guessed;
    
    word = word.split('');
    
    word = word.map(letter => {
      return guessed.indexOf(letter) !== -1 ? letter : '_';
    });
    
    return word;
  }

  render() {
    const game = this.props.game;
    const isPlayer = this.props.isPlayer;
    
    document.title = 'Game started';
    
    return (
      <div>
        { game ? 
          <section className="game">
            { game.state === 'playing' ?
              <div>
                <h1>{game.challenger.username} vs. {game.player.username}</h1>
                
                <strong>Word: </strong> { this.word() }
                
                <h2>Turns left: {game.turns}</h2>
                
                { isPlayer ?
                  <form onSubmit={this.handleGuess.bind(this)}>
                    <label htmlFor="letter">Guess letter: </label>
                    <input type="text" ref="letterInput" maxLength="1" />
                  </form>
                  : ''
                }
                
                <div className="guessed">{game.guessed}</div>
                
                <button onClick={this.end.bind(this)}>End game</button>
              </div>
            : '' }
            
            { game.state === 'won' ? 
              <div>
                <h3>{game.player.username} correctly guessed the word: <em>"{this.props.game.word}"</em>!</h3>
                
                <button onClick={this.end.bind(this)}>End game</button>
              </div>
            : '' }
            
            { game.state === 'lost' ? 
              <div>
                <h3>{game.player.username} didn't guess the word: <em>"{this.props.game.word}"</em>...</h3>
                
                <button onClick={this.end.bind(this)}>End game</button>
              </div>
            : '' }
          </section>
        :
          <h1>Loading...</h1> 
        }
      </div>  
    );
  }
}

Game.propTypes = {
  game: PropTypes.object
};

export default createContainer(() => {
  Meteor.subscribe('games');
  
  const gameId = Meteor.user().gameId;
  const game = Games.findOne(gameId);
 
  let isPlayer = false;
  
  if (game) {
    isPlayer = game.player.id === Meteor.userId();
  }
  
  return {
    game: game,
    isPlayer: isPlayer
  };
}, Game);
