import React from 'react';
import { Header } from '../header/Header';
import { SingleAccountPage } from './SingleAccountPage';

export const BlankComponent = () => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <SingleAccountPage />
    </div>
  );
};
