import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

import './AccountList.css';
import { Link } from 'react-router-dom';

export const AccountsList = () => {
  const userContext = useContext(AuthContext);

  return (
    <>
      {userContext?.accounts.map((account) => (
        <div className="single-account" key={account.id}>
          <Link to={`/accounts/${account.id}`}>
            <div className="account-button">
              <p>
                {account.name} <br />
                {account.value} {account.currency}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
