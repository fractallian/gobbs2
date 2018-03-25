import React from 'react';
import {Provider} from 'react-redux';
import './App.css';
import store from './store';
import BoardContainer from './containers/board_container';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

class App extends React.PureComponent {
  render() {
    return (
      <Provider {...{store}}>
        <div className="App">
          <BoardContainer/>
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
