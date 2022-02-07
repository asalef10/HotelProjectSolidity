import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UseContext from '../src/context/context';

ReactDOM.render(
  <React.StrictMode>
    <UseContext>
      <App />
    </UseContext>
  </React.StrictMode>,
  document.getElementById('root')
);
