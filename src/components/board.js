import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import StackContainer from '../containers/stack_container';

export default class Board extends React.PureComponent {
  static propTypes = {
    stacks: PropTypes.array.isRequired,
    board: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    winner: PropTypes.number
  }

  stacks = (stacks) => {
    return _.map(stacks, (index) => {
      const pieces = this.props.stacks[index];
      return <StackContainer key={index} {...{pieces, index}}/>;
    });
  }

  rows = () => {
    return _.map(this.props.board, (row, i) => {
      return <div className="row" key={i}>{this.stacks(row)}</div>;
    });
  }

  winner = () => {
    if (this.props.winner !== undefined) {
      return <div className="winner">Player {this.props.winner} Wins!</div>;
    } else { return null; }
  }

  render() {
    return (
      <div className="game">
        {this.winner()}
        <div className="player player-0">{this.stacks(this.props.players[0])}</div>
        <div className="board">{this.rows()}</div>
        <div className="player player-1">{this.stacks(this.props.players[1])}</div>
      </div>
    );
  }
}