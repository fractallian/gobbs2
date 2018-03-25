import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import PieceContainer from '../containers/piece_container';

const targetSpec = {
  drop(props, monitor) {
    const item = monitor.getItem();
    item.movePiece(item.stackIndex, props.index);
  },
  canDrop(props, monitor) {
    if (props.index > 15) return false;
    const item = monitor.getItem();
    const topSize = _.get(_.last(props.pieces), 'size', -1);
    return item.size > topSize;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Stack extends React.Component {
  static propTypes = {
    pieces: PropTypes.array,
    index: PropTypes.number.isRequired
  }

  pieces = () => {
    return _.map(this.props.pieces, (piece, i) => {
      return <PieceContainer key={i} stackIndex={this.props.index} {...piece} />;
    });
  }

  render() {
    const {isOver, canDrop, connectDropTarget} = this.props;

    let color;
    if (isOver && canDrop) {
      color = 'green';
    } else if (!isOver && canDrop) {
      color = 'yellow';
    } else if (isOver && !canDrop) {
      color = 'red';
    } else {
      color = 'gray';
    }

    return connectDropTarget(
      <div className="stack" style={{backgroundColor: color}}>
        {this.pieces()}
      </div>
    );
  }
}

export default DropTarget('piece', targetSpec, collect)(Stack);
