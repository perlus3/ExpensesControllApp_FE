import React from 'react';
import { Currency } from '../../types/interfaces';
import { Details } from '../views/Details';
import { DeleteAccountBtn } from '../common/buttons/DeleteAccountBtn';
import { EditAccountBtn } from '../common/buttons/EditAccountBtn';

interface Props {
  id: string | undefined;
  value: number;
  currency: Currency;
}

export const AccountInfo = (props: Props) => {
  return (
    <div className="col border border-dark rounded shadow-sm mx-auto">
      <div className="row border-bottom border-dark">
        <div className="col-9 d-flex align-items-center">
          <div className="me-5"></div>
          <div>
            <h1 className="fs-5 my-3">
              Saldo: {props.value} {props.currency}
            </h1>
          </div>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-end">
          <div className="me-2">
            <EditAccountBtn />
          </div>
          <div>
            <DeleteAccountBtn />
          </div>
        </div>
      </div>
      <div className="row">
        <Details accountId={props.id} />
      </div>
    </div>
  );
};
