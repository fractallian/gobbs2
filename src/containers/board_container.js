import Board from '../components/board';
import {connect} from 'react-redux';
import {movePiece} from '../actions';

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => {
  return {
    onMove: (fromStackIndex, toStackIndex) => {
      dispatch(movePiece(fromStackIndex, toStackIndex));
    }
  };
};

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;