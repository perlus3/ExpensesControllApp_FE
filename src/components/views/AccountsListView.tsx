import React from 'react';

import { Link } from 'react-router-dom';

import './AccountList.css';
import { NewAccountEntity } from '../../types/interfaces';

interface Props {
  accounts?: NewAccountEntity[] | undefined;
}

export const AccountsListView = (props: Props) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <p className="fs-3 pt-4 text-center">Wybierz konto:</p>
        </div>
        {props.accounts?.map((account) => (
          <div
            key={account.id}
            className="col-md-4 py-2 d-flex justify-content-center"
          >
            <div className="box border border-dark border-3 rounded-pill">
              <Link to={`/accounts/${account.id}`}>
                <div className="account-button text-capitalize flex-column text-center">
                  <p className="fs-2 text" style={{ color: 'red' }}>
                    {account.name}
                  </p>
                  <p className="text-wrap text-break">
                    {account.value} {account.currency}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
