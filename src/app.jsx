import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom'

import Hello from './hello.jsx';

ReactDOM.render(<Hello />, document.getElementById('app'));

if (DEVELOPMENT) {
  if (module.hot) {
    module.hot.accept();
  }
}

