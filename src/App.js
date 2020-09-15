import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import Play from './components/Play';
import Stats from './components/Stats';

function App() {
  return (
  <Router basename="/#">
    <Route exact path = "/" component = {Home} />
    <Route exact path = "/takequiz" component = {Play} />
    <Route exact path = "/stats" component = {Stats} />
  </Router>
  );
}

export default App;