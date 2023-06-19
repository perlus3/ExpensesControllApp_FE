import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
}
export const AddOperationBtn = ({ id }: Props) => {
  return (
    <button className="btn btn-primary" type="button">
      <Link to={`/add-operation/${id}`}>Dodaj operacje</Link>
    </button>
  );
};
