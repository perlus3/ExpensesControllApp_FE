import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NewAccountEntity } from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';

export const Header = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<NewAccountEntity[] | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/accounts/all`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.statusCode === 401) {
          navigate('/login');
        }
        setAccounts(data);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark border-bottom border-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/user" className="navbar-brand text">
          ExpenseApp
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
            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle text"
                id="accountsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Wybierz Konto
              </Link>
              <ul
                className="dropdown-menu w-50"
                aria-labelledby="accountsDropdown"
              >
                {accounts?.map((account) => (
                  <li key={account.id}>
                    <Link
                      to={`/accounts/${account.id}`}
                      className="dropdown-item"
                    >
                      {account.name.charAt(0).toUpperCase() +
                        account.name.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link
                to="/new-account"
                className="nav-link text"
                aria-current="page"
              >
                Dodaj Konto
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/new-account"
                className="nav-link text"
                aria-current="page"
              >
                Analizy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/log-out" className="nav-link text" aria-current="page">
                Wyloguj
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
