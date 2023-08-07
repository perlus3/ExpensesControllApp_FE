import React from 'react';
import { GoBackButton } from './buttons/GoBackBtn';

interface Props {
  message: string;
}

export const ErrorHandler = (props: Props) => {
  const message = `Jeżeli przycisk "Powrót" nie działa zresetuj aplikacje.`;
  return (
    <div className="container-fluid text-center">
      <div
        className="row border border-danger"
        style={{ backgroundColor: '#fa756b' }}
      >
        <div className="col d-flex align-items-center justify-content-center my-3">
          <p>{props.message}</p>
          <p>{message}</p>
        </div>
      </div>
      <div className="row mt-3 w-100">
        <div className="col text-center">
          <GoBackButton />
        </div>
      </div>
    </div>
  );
};
