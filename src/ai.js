import _ from 'lodash';
import Game from './game';

class BoardAnalyzer {
  constructor(state, player) {
    this.player = player;
    this.lines = _.map(Game.lines(), (l) => new Line(state.stacks, l));
  }

  score() {
    return _.reduce(this.lines, (sum, line) => {
      const score = line.score(this.player);
      return sum + score;
    }, 0);
  }
}


class Line {
  constructor(stacks, stackIndexes) {
    this.debugMode = false;
    this.playerPieces = [[], []];
    this.pieces = _.map(stackIndexes, (i) => {
      const piece = _.last(stacks[i]);
      if (piece) {
        this.playerPieces[piece.player].push(piece);
      }
      return piece || {};
    });
  }

  count(player) {
    return this.playerPieces[player].length;
  }

  score(player) {
    const opponent = this.opponent(player);
    if (this.count(player) === 4) return 2000;
    if (this.count(opponent) === 4) return -4000;
    if (this.canOpponentWin(player)) return -1000;
    if (this.canOpponentWin(opponent)) return 500;
    const score = this.points(player) - (this.points(opponent));
    this.debug(score);
    return score;
  }

  points(player) {
    // max: 39, min: 4
    return Math.pow(3, this.count(player)) + this.sizeSum(player);
  }

  sizeSum(player) {
    return _.reduce(this.playerPieces[player], (sum, p) => {
      return sum + p.size + 1;
    }, 0);
  }

  blockedBy(player) {
    for (let piece of this.playerPieces[player]) {
      if (piece.size === 3) return true;
    }
    return false;
  }

  opponent(player) {
    return Number(!player);
  }

  canOpponentWin(player) {
    if (this.count(this.opponent(player)) < 3) return false; 
    if (this.sizeSum(player) > 3) return false;
    return true;
  }

  debug(data) {
    if (this.debugMode)
      console.log(JSON.stringify(this.pieces), data);
  }
}


export default class AI {
  static decideMove(state) {
    return new AI(state).bestMove();
  }

  constructor(state) {
    this.state = state; 
  }

  bestMove() {
    let max;
    const bestMove = _.last(_.sortBy(this.possibleMoves(), (move) => {
      const rating = this.rateMove(move);
      if (!max || rating > max) max = rating;
      return rating;
    }));
    // console.log(JSON.stringify(bestMove), max);
    return bestMove;
  }

  rateMove({fromStackIndex, toStackIndex}) {
    const resultState = Game.makeMove(this.state, fromStackIndex, toStackIndex);
    const ba = new BoardAnalyzer(resultState, this.state.currentTurn);
    return ba.score();
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