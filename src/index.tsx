import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { store } from './app/store';
import { QbtCaptThemer } from './features/theme/QbCaptThemer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <QbtCaptThemer>
          <CssBaseline />
          <App />
        </QbtCaptThemer>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
