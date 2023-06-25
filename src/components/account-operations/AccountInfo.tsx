import React from 'react';
import { Currency } from '../../types/interfaces';
import { AddOperationBtn } from '../common/buttons/AddOperationBtn';

interface Props {
  id: string;
  name: string;
  value: number;
  currency: Currency;
}

export const AccountInfo = (props: Props) => {
  return (
    <div className="col-5 border border-white rounded-3 mx-5">
      <div className="col-8 pt-3">
        <h1 className="text-capitalize text">{props.name}</h1>
      </div>
      <div className="col-8 pb-2">
        <span className="text">
          {props.value} {props.currency}
        </span>
      </div>
      <div className="row justify-content-center p-0">
        <div className="col-4 pb-2">
          <AddOperationBtn id={props.id} />
        </div>
      </div>
    </div>
  );
};
