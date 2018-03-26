import Stack from '../components/stack';
import {connect} from 'react-redux';
import Game from '../game';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    canMove: (fromStackIndex) => {
      return Game.canMove(state, fromStackIndex, ownProps.index);
    }
  };
};

const StackContainer = connect(
  mapStateToProps
)(Stack);

export default StackContainer;