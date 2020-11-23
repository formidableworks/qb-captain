import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { selectIsAuthd } from './authentication/authSelectors';
import { LoginDialog } from './authentication/LoginDialog';
import { TransfersRoot } from './sync/TransfersRoot';

export const PageRouter = (): JSX.Element => {
  const isAuthd = useSelector(selectIsAuthd);
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (!isAuthd && location.pathname !== '/login') {
      console.warn('user is unauthorised, redirecting to login page.');
      history.push({ pathname: '/login' });
    }
    // if user isAuthd and on login page redirect to root/ referrer page (when stored in search params.)
    if (isAuthd && location.pathname === '/login') {
      history.go(-1);
    }
  }, [isAuthd, location]);

  return (
    <Switch>
      <Route path="/transfers">
        <TransfersRoot />
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
        <LoginDialog />
      </Route>

      <Route exact path="/">
        <Redirect to="/transfers" />
      </Route>
    </Switch>
  );
};
