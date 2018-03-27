import _ from 'lodash';
import {createStore} from 'redux';
import Game from './game';
import AI from './ai';

const _stacks = [];

function _addStack(stack) {
  const index = _stacks.length;
  _stacks.push(stack);
  return index;
}

function _initialStacks(player) {
  return _.map(_.range(0, 3), () => {
    return _addStack(_.map(_.range(0, 4), (size) => {
      return {size, player};
    }));
  });
}

const initialState = {
  board: _.map(_.range(0, 4), () => {
    return _.map(_.range(0, 4), () => {
      return _addStack([]);
    });
  }),
  players: [_initialStacks(0), _initialStacks(1)],
  stacks: _stacks,
  currentTurn: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'MOVE': {
    let newState = Game.makeMove(state, action.fromStackIndex, action.toStackIndex);
    if (state.currentTurn === 0 && newState.winner === undefined) {
      const move = AI.decideMove(newState);
      newState = Game.makeMove(newState, move.fromStackIndex, move.toStackIndex);
    }
    return newState;
  }
  default: {
    return state;
  }
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

AI.decideMove(store.getState());

export default store;
