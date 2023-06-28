import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../../config/api';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { Button } from 'react-bootstrap';

export const DeleteAccountBtn = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const handleDeleteClick = async (accountId: string | undefined) => {
    const res = await fetch(`${apiUrl}/accounts/${accountId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext?.token}`,
      },
    });
    const data = await res.json();

    if (data.affected) {
      navigate(-1);
    }
  };

  return (
    <Button
      className="btn btn-sm smaller-button btn-danger"
      type="button"
      onClick={() => handleDeleteClick(id)}
    >
      <span className="text-white">Usuń konto</span>
    </Button>
  );
};
