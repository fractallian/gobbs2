import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './store';

global._ = require('lodash');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
