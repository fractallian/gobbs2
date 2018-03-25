import _ from 'lodash';
import {createStore} from 'redux';

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
  })
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
      const fromStack = [...state.stacks[action.fromStackIndex]];
      const toStack = [...state.stacks[action.toStackIndex]];
      toStack.push(fromStack.pop());
      const stacks = [...state.stacks];
      stacks[action.fromStackIndex] = fromStack;
      stacks[action.toStackIndex] = toStack;
      return {
        ...state,
        stacks,
        currentTurn: Number(state.currentTurn === 0)
      };
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

export default store;
