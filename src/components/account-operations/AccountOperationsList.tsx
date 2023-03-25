import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';

import { apiUrl } from '../../config/api';
import { NewOperationData } from '../../../../wydatki-backend/types';
import { SingleAccountOperation } from './SingleAccountOperation';

import './AccountOperationList.css';

interface Props {
  id: string | undefined;
}

export const AccountOperationsList = (props: Props) => {
  const userContext = useContext(AuthContext);
  const [operations, setOperations] = useState<NewOperationData[]>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/operations/all/${props.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      const data = await res.json();
      setOperations(data);
    })();
  }, []);

  if (!operations) {
    return null;
  }

  const operationsList = operations.map((operation: any) => (
    <SingleAccountOperation
      key={operation.id}
      name={operation.name}
      value={operation.value}
      operationType={operation.operationType}
      date={operation.date}
    />
  ));

  return <div className="operations-list">{operationsList}</div>;
};
