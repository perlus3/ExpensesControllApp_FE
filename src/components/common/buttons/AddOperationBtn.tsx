import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

interface Props {
  id: string | undefined;
}
export const AddOperationBtn = ({ id }: Props) => {
  return (
    <Button className="btn btn-sm smaller-button btn-primary">
      <Link to={`/add-operation/${id}`}>
        <span className="text-white">Dodaj nową operacje</span>
      </Link>
    </Button>
  );
};
