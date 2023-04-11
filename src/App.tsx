import React from 'react';
import { AuthProvider } from './contexts/authContext';
import { Routing } from './Routing';

import './App.css';

export const App = () => {
  return (
    <AuthProvider>
      <div className="page">
        <Routing />
      </div>
    </AuthProvider>
  );
};
