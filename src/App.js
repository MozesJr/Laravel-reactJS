import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Tables from './pages/Tables';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Dashboard} />
      <Route exact path="/tables" component={Tables} />
    </Switch>
  );
}

export default App;