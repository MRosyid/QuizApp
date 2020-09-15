import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './styles/styles.scss';
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <Router basename="#">
    <App />
  </Router>,
  document.getElementById('root')
);
