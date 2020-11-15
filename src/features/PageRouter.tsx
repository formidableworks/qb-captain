import qs from 'qs';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { selectIsAuthd } from './authentication/authSelectors';
import { LoginForm } from './authentication/LoginForm';
import { MaindataControl } from './sync/MaindataControl';

export const PageRouter = (): JSX.Element => {
  const isAuthd = useSelector(selectIsAuthd);
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (!isAuthd && location.pathname !== '/login') {
      console.warn('user is unauthorised, redirecting to login page.');
      history.push(`/login?${qs.stringify({ referrer: location.pathname })}`);
    }
    // if user isAuthd and on login page redirect to root/ referrer page (when stored in search params.)
    if (isAuthd && location.pathname === '/login') {
      const searchParams = qs.parse(location.search.replace('?', ''));
      if (searchParams.referrer) {
        history.push(searchParams.referrer as string);
      } else {
        history.push('/');
      }
    }
  }, [isAuthd, location]);

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
