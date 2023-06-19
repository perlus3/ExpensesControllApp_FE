import React from 'react';

import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg background-color">
      <div className="container">
        <Link to="#" className="navbar-brand text-white">
          ExpenseApp
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-label="Rozwiń nawigacje"
        >
          <div className="navbar-toggler-icon text-white"></div>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/new-account"
                className="nav-link text-white"
                aria-current="page"
              >
                Dodaj Konto
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/log-out"
                className="nav-link text-white"
                aria-current="page"
              >
                Wyloguj
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
