import React from 'react';

import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg background-color border-bottom border-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/user" className="navbar-brand">
          ExpenseApp
        </Link>
        <button
          className="navbar-toggler"
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
              <Link to="/new-account" className="nav-link" aria-current="page">
                Dodaj Konto
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/log-out" className="nav-link" aria-current="page">
                Wyloguj
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
