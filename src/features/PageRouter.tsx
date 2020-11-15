import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginForm } from './authentication/LoginForm';
import { MaindataControl } from './sync/MaindataControl';

export const PageRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/transfers">
        <MaindataControl />
      </Route>

      <Route path="/search">
        <div>search page</div>
      </Route>

      <Route path="/rss">
        <div>rss page</div>
      </Route>

      <Route path="/settings">
        <div>settings page</div>
      </Route>

      <Route path="/login">
        <LoginForm />
      </Route>

      <Route exact path="/">
        <Redirect to="/transfers" />
      </Route>
    </Switch>
  );
};
