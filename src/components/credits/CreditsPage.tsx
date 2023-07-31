import React from 'react';

import '../landing-page/LandingPage.css';

export const CreditsPage = () => {
  const emailAddress = 'kamilperlega@gmail.com';
  return (
    <div className="container-fluid background-image vh-100">
      <div className="col px-2">
        <div className="row">
          <p className="text pt-4">Autor: Kamil Perlega</p>
        </div>
        <div className="row">
          <p className="text w-25">
            <p className="text">Contact:</p>
            <a href={`mailto:${emailAddress}`}>
              <p className="link">{emailAddress} </p>
            </a>
          </p>
        </div>
        <div className="row">
          <p className="text w-25">
            <p className="text">GitHub profile:</p>
            <a href="https://github.com/perlus3">
              <p className="link">https://github.com/perlus3</p>
            </a>
          </p>
        </div>
        <div className="row">
          <p className="text">Free SVG Background by:</p>
          <p className="text w-25">
            <a href="https://bgjar.com">
              <p className="link">BGJar</p>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
