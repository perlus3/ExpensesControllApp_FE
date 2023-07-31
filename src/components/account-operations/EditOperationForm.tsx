import { useParams } from 'react-router-dom';
import React from 'react';
import { EditOperation } from '../../utils/EditOperation';

export const EditOperationForm = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className="edit-form background-image vh-100">
      <EditOperation operationId={id} />
    </div>
  );
};
