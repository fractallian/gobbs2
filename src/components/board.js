import _ from 'lodash';
import React from 'react';
import Stack from './stack';

export default class Board extends React.PureComponent {
  stacks = (stacks) => {
    return _.map(stacks, (index) => {
      const pieces = this.props.stacks[index];
      return <Stack key={index} {...{pieces, index}}/>;
    });
  }

  rows = () => {
    return _.map(this.props.board, (row, i) => {
      return <div className="row" key={i}>{this.stacks(row)}</div>;
    });
  }

  render() {
    return (
      <div className="game">
        <div className="player player-0">{this.stacks(this.props.players[0])}</div>
        <div className="board">{this.rows()}</div>
        <div className="player player-1">{this.stacks(this.props.players[1])}</div>
      </div>
    );
  }
}