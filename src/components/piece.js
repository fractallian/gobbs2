import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {DragSource} from 'react-dnd';

const pieceSource = {
  beginDrag(props) {
    const {stackIndex, onMove} = props;
    return {stackIndex, movePiece: onMove};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Piece extends React.PureComponent {
  static propTypes = {
    player: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    stackIndex: PropTypes.number.isRequired,
    onMove: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }
  render() {
    const {player, size, connectDragSource} = this.props;
    const className = classnames('piece', `player-${player}`, `size-${size}`);
    return connectDragSource(<div {...{className, key: size}}>{size}</div>);
  }
}

export default DragSource('piece', pieceSource, collect)(Piece);
