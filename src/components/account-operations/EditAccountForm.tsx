import { useParams } from 'react-router-dom';
import React from 'react';
import { EditAccount } from '../views/EditAccount';

export const EditAccountForm = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className="edit-form background-image vh-100">
      <EditAccount accountId={id} />
    </div>
  );
};
