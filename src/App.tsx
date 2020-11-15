import React from 'react';
import { LoginForm } from './features/authentication/LoginForm';
import { MainDataControl } from './features/sync/MainDataControl';

export function App(): JSX.Element {
  return (
    <div>
      <LoginForm />
      <MainDataControl />
    </div>
  );
}
