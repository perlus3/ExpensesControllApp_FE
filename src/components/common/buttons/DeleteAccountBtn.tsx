import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../../config/api';
import React from 'react';
import { Button } from 'react-bootstrap';

export const DeleteAccountBtn = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const handleDeleteClick = async (accountId: string | undefined) => {
    const res = await fetch(`${apiUrl}/accounts/${accountId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.statusCode === 401) {
      navigate('/login');
    }

    if (data.affected) {
      navigate(-1);
    }
  };

  return (
    <Button
      className="btn btn-sm btn-danger mx-2"
      type="button"
      onClick={() => handleDeleteClick(id)}
    >
      <span className="text-white">Usuń konto</span>
    </Button>
  );
};
