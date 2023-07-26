import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const EditAccountBtn = () => {
  const params = useParams();
  const { id } = params;

  return (
    <Button className="btn btn-sm btn-warning mx-2">
      <Link to={`/edit-account-form/${id}`}>
        <span className="text-white text-xs">Edytuj konto</span>
      </Link>
    </Button>
  );
};
