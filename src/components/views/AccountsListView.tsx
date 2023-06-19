import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

import { Link } from 'react-router-dom';

import './AccountList.css';

export const AccountsListView = () => {
  const userContext = useContext(AuthContext);
  return (
    <>
      <div className="col-12 d-flex justify-content-center">
        <p className="fs-3 pt-4">Wybierz konto</p>
      </div>

      <div className="col">
        {userContext?.accounts &&
          userContext?.accounts.map((account) => (
            <div className="col-12 py-2" key={account.id}>
              <div className="box w-50 border border-dark border-3 rounded-pill">
                <Link to={`/accounts/${account.id}`}>
                  <div className="account-button text-capitalize flex-column">
                    <span className="fs-6 text" style={{ color: 'red' }}>
                      {account.name}
                    </span>
                    <span>
                      {account.value} {account.currency}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
