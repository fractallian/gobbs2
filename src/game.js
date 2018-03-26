import _ from 'lodash';

function _horizontalLines() {
  return _.map(_.range(0, 4), (row) => {
    const start = row * 4;
    return _.range(start, start + 4);
  });
}

function _verticalLines() {
  return _.map(_.range(0, 4), (col) => {
    return _.map(_.range(0, 4), (i) => {
      return col + (i * 4);
    });
  });
}

function _diagonalLines() {
  return [
    _.map(_.range(0, 4), (i) => {
      return i * 5;
    }),
    _.map(_.range(0, 4), (i) => {
      return (i +1) * 3;
    })
  ];
}

const _lines = _.concat(
  _horizontalLines(),
  _verticalLines(),
  _diagonalLines()
);

const _corners = [0, 3, 12, 15];
const _middles = [5, 6, 9, 10];

export default class Game {
  static canMove(state, fromStackIndex, toStackIndex) {
    if (state.winner !== undefined) return false;
    if (this.isPlayer(toStackIndex)) return false;
    const piece = _.last(state.stacks[fromStackIndex]);
    if (!piece) return false;
    const toStack = state.stacks[toStackIndex];
    const topSize = _.get(_.last(toStack), 'size', -1);
    if (piece.size <= topSize) return false;
    if (this.isPlayer(fromStackIndex) && topSize > -1) {
      return this.preventsLoss(state, toStackIndex);
    }
    return true;
  }

  static preventsLoss(state, toStackIndex) {
    const lines = _.filter(_lines, (line) => _.indexOf(line, toStackIndex) > -1);
    for (let line of lines) {
      const count = _.reduce(line, (sum, stackIndex) => {
        const piece = _.last(state.stacks[stackIndex]);
        if (piece) {
          if (piece.player === state.currentTurn) {
            if (piece.size === 3) return 0;
          } else {
            return sum + 1;
          }
        }
        return sum; 
      }, 0);
      if (count === 3) {
        return true;
      }
    }
    return false;
  }

  static makeMove(state, fromStackIndex, toStackIndex) {
    const fromStack = [...state.stacks[fromStackIndex]];
    const toStack = [...state.stacks[toStackIndex]];
    toStack.push(fromStack.pop());
    const stacks = [...state.stacks];
    stacks[fromStackIndex] = fromStack;
    stacks[toStackIndex] = toStack;
    return {
      ...state,
      stacks,
      currentTurn: Number(state.currentTurn === 0),
      winner: this.getWinner(stacks)
    };
  }

  static getWinner(stacks) {
    for (let line of _lines) {
      let count = 0;
      let player;
      for (let stackIndex of line) {
        const stack = stacks[stackIndex];
        const piece = _.last(stack);
        if (!piece) break;
        if (!count) {
          player = piece.player;
        } else {
          if (player !== piece.player) break;
        }
        count++;
      }
      if (count === 4) return player;
    }
  }

  static lines() {
    return _.cloneDeep(_lines);
  }

  static isCorner(stackIndex) {
    return _.indexOf(_corners, stackIndex) > -1;
  }

  static isMiddle(stackIndex) {
    return _.indexOf(_middles, stackIndex) > -1;
  }

  static isPlayer(stackIndex) {
    return stackIndex > 15;  
  }
}