import React from 'react';

import { Link } from 'react-router-dom';

import './AccountList.css';
import { NewAccountEntity } from '../../types/interfaces';

interface Props {
  accounts?: NewAccountEntity[] | undefined;
}

export const AccountsListView = (props: Props) => {
  return (
    <>
      <div className="col-12 d-flex justify-content-center">
        <p className="fs-3 pt-4">Wybierz konto</p>
      </div>

      <div className="col">
        {props.accounts &&
          props.accounts.map((account) => (
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
