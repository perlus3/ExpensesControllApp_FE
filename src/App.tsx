import React from 'react';
import { Routing } from './Routing';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column vh-100 background-image-user-main-view">
        <Routing />
      </div>
    </>
  );
};
