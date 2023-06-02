import React from 'react';

import '../landingPage/LandingPage.css';

export const CreditsPage = () => {
  const emailAddress = 'kamilperlega@gmail.com';
  return (
    <div className="container-fluid background-image vh-100">
      <div className="col">
        <div className="row">
          <p className="display-6 text">Autor: Kamil Perlega</p>
        </div>
        <div className="row">
          <p className="display-6 text w-50">
            <p className="display-6 text">Contact:</p>
            <a href={`mailto:${emailAddress}`}>
              <p className="display-6 link">{emailAddress} </p>
            </a>
          </p>
        </div>
        <div className="row">
          <p className="display-6 text w-50">
            <p className="display-6 text">GitHub profile:</p>
            <a href="https://github.com/perlus3">
              <p className="link">https://github.com/perlus3</p>
            </a>
          </p>
        </div>
        <div className="row">
          <p className="display-6 text">Free SVG Background by:</p>
          <p className="display-6 text w-25">
            <a href="https://bgjar.com">
              <p className="link">BGJar</p>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
