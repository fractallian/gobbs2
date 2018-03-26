import _ from 'lodash';
import Game from './game';

export default class AI {
  static decideMove(state) {
    return new AI(state).bestMove();
  }

  constructor(state) {
    this.state = state;
  }

  bestMove() {
    const moves = _.sortBy(this.possibleMoves(), (move) => {
      return this.rateMove(move);
    });
    return _.last(moves);
  }

  rateMove({fromStackIndex, toStackIndex}) {
    const resultState = Game.makeMove(this.state, fromStackIndex, toStackIndex);
    const lines = Game.lines();
    const player = this.state.currentTurn;
    const opponent = Number(!player);
    let score = 0;
    for (let line of lines) {
      const myPieces = [];
      const theirPieces = [];
      _.each(line, (stackIndex) => {
        const piece = {
          ..._.last(resultState.stacks[stackIndex]),
          stackIndex
        };
        if (piece.player === player) {
          myPieces.push(piece);
        } else if (piece.player === opponent) {
          theirPieces.push(piece);
        }
      });

      if (theirPieces.length === 4) {
        // lose game (uncovered opponent's 4th)
        return -100;
      }
      if (myPieces.length === 4) {
        // win game
        return 100;
      }
      if (theirPieces.length === 3) {
        if (myPieces.length && myPieces[0].size < 3) {
          // give opponent a win opportunity
          return -100;
        }
        // blocked 3
        score -= 4;
      }
      if (myPieces.length === 3) {
        score += 10;
      }
      if (myPieces.length === 2) {
        score += 5;
      }
      if (theirPieces.length === 2) {
        score -= 5;
      }
      if (myPieces.length === 1) {
        // add 3 for corner/middle pieces and 2 for others
        score++;
      }
      if (theirPieces.length === 1) {
        // minus 3 for corner/middle pieces and 2 for others
        score --;
      }
    }
    return score;
  }

  possibleMoves() {
    const moves = [];
    _.each(this.state.stacks, (fromStack, fromStackIndex) => {
      const piece = _.last(fromStack);
      if (piece && piece.player === this.state.currentTurn) {
        _.each(this.state.stacks, (toStack, toStackIndex) => {
          if (Game.canMove(this.state, fromStackIndex, toStackIndex)) {
            moves.push({fromStackIndex, toStackIndex});
          }
        });
      }
    });
    return moves;
  }
}