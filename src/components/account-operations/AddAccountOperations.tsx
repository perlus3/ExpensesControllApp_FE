import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { Currency } from '../../types/interfaces';

interface Props {
  name: string;
  value: number;
  currency: Currency;
}

export const AddAccountOperations = (props: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const openIncomeForm = () => {
    navigate(`/income-form/${id}`);
  };

  const openExpenseForm = () => {
    navigate(`/expense-form/${id}`);
  };

  return (
    <div
      className="row justify-content-center"
      style={{ background: '#000C5EFF' }}
    >
      <div className="col-8 pt-3">
        <h1 className="text-capitalize" style={{ color: 'white' }}>
          {props.name}
        </h1>
      </div>
      <div className="col-8 pb-2">
        <span style={{ color: 'white' }}>
          {props.value} {props.currency}
        </span>
      </div>
      <div className="row justify-content-center p-0">
        <div className="col-4 pb-2">
          <button
            className="btn px-4 py-2 rounded-circle border border-3 border-color-white"
            onClick={openIncomeForm}
          >
            <p
              className="fs-1 fw-bold my-0"
              style={{ color: 'green', fontSize: '20px' }}
            >
              +
            </p>
          </button>
        </div>
        <div className="col-4">
          <button
            className="btn px-4 py-2 rounded-circle border border-3 border-color-white"
            onClick={openExpenseForm}
          >
            <p className="fs-1 fw-bold my-0" style={{ color: 'red' }}>
              -
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
