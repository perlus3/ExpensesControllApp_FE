import React from 'react';
import { Routing } from './Routing';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column min-vh-100 background-color">
        <div className="flex-grow-1">
          <Routing />
        </div>
      </div>
    </>
  );
};
