import React from 'react';
import '../../assets/styles/LandingPage.css';

import background from '../../assets/images/background-landing-page.jpg';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const landingPageStyle = {
    background: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-sm navbar-landing-page">
        <div className="container d-flex justify-content-between align-items-center mx-2">
          <Link to="/user" className="navbar-brand text">
            <p className="text display-6">ExpenseApp</p>
          </Link>
          <button
            className="navbar-toggler border-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link" aria-current="page">
                  <p className="text m-0">Logowanie</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link" aria-current="page">
                  <p className="text m-0">Rejestracja</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/credits" className="nav-link" aria-current="page">
                  <p className="text m-0">Credits</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="row row-landing-page vh-100 position-absolute"
        style={landingPageStyle}
      >
        <div className="col px-1 d-flex justify-content-center align-items-center overlay">
          <p className="text-center text-white display-6 p-3">
            Zarządzaj swoimi pieniędzmi. Zaplanuj budżet. Oszczędzaj!
          </p>
        </div>
      </div>
    </>
  );
};
