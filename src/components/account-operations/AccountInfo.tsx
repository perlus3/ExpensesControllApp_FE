import React from 'react';
import { Currency } from '../../types/interfaces';
import { Details } from '../views/Details';
import { DeleteAccountBtn } from '../common/buttons/DeleteAccountBtn';
import { EditAccountBtn } from '../common/buttons/EditAccountBtn';

interface Props {
  id?: string;
  value?: number;
  currency: Currency;
}

export const AccountInfo = (props: Props) => {
  // console.log('account info render');
  return (
    <div className="col-12">
      <div className="col border rounded border-dark">
        <div className="border-bottom border-dark d-flex justify-content-between align-items-center">
          <div className="col-6">
            <h1 className="fs-5 m-3">
              <span>
                Saldo: {props.value} {props.currency}
              </span>
            </h1>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end">
              <EditAccountBtn />
              <DeleteAccountBtn />
            </div>
          </div>
        </div>
        <div className="row">
          <Details accountId={props.id} />
        </div>
      </div>
    </div>
  );
};
