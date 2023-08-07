import React from 'react';
import { Routing } from './pages/Routing';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAccountsProvider } from './context/UserAccountsContext';

export const App = () => {
  return (
    <>
      <UserAccountsProvider>
        <ToastContainer />
        <div className="d-flex flex-column vh-100 background-image-user-main-view">
          <Routing />
        </div>
      </UserAccountsProvider>
    </>
  );
};
