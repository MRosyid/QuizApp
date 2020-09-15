import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import Play from './components/Play';
import Stats from './components/Stats';

function App() {
  return (
  <Router>
    <Route exact path = {process.env.PUBLIC_URL + '/#/'} component = {Home} />
    <Route exact path = {process.env.PUBLIC_URL + '/#/takequiz'} component = {Play} />
    <Route exact path = {process.env.PUBLIC_URL + '/#/stats'} component = {Stats} />
  </Router>
  );
}

export default App;