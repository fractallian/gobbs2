import Piece from '../components/piece';
import {connect} from 'react-redux';
import {movePiece} from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    canDrag: () => {
      return state.currentTurn === ownProps.player;
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMove: (fromStackIndex, toStackIndex) => {
      dispatch(movePiece(fromStackIndex, toStackIndex));
    }
  };
};

const PieceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Piece);

export default PieceContainer;