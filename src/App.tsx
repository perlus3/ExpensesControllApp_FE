import React from 'react';
import { AuthProvider } from './contexts/authContext';
import { Routing } from './Routing';
export const App = () => {
  return (
    <AuthProvider>
      <div className="page">
        <Routing />
      </div>
    </AuthProvider>
  );
};
