import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Tables from './pages/Tables';
import IndexUser from './pages/user/IndexUser';
import CreateUser from './pages/user/CreateUser';
import UpdateUser from './pages/user/UpdateUser';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Dashboard} />

      {/* CRUD DATA USER */}
      <Route exact path="/user" component={IndexUser} />
      <Route exact path="/user/create" component={CreateUser} />
      <Route exact path="/user/edit/:id" component={UpdateUser} />

    </Switch>
  );
}

export default App;