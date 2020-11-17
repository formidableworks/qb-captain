import React from 'react';
import { AppShell } from './features/navigation/AppShell';
import { PageRouter } from './features/PageRouter';

export function App(): JSX.Element {
  return (
    <AppShell>
      <PageRouter />
    </AppShell>
  );
}
