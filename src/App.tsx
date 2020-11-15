import React from 'react';
import './App.css';
import { LoginForm } from './features/authentication/LoginForm';
import { MainDataControl } from './features/sync/MainDataControl';
import logo from './logo.svg';

export function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginForm />
        <MainDataControl />
      </header>
    </div>
  );
}
