import React from 'react';
import './LandingPage.css';

import background from '../../assets/images/background-landing-page.jpg';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const landingPageStyle = {
    background: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="col-4">
            <p className="text display-6 px-4">ExpenseApp</p>
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <button className="btn btn-primary btn-lg">
              <Link to="/login">
                <p className="text m-0">Zaloguj</p>
              </Link>
            </button>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <button className="btn btn-primary btn-lg">
              <Link to="/register">
                <p className="text m-0">Rejestracja</p>
              </Link>
            </button>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <button className="btn btn-primary btn-lg">
              <Link to="/credits">
                <p className="text m-0">Credits</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="row vh-100" style={landingPageStyle}>
        <div className="col d-flex justify-content-center align-items-center overlay">
          <p className="text display-6">
            Zarządzaj swoimi pieniędzmi. Zaplanuj budżet. Oszczędzaj!
          </p>
        </div>
      </div>
    </div>
  );
};
