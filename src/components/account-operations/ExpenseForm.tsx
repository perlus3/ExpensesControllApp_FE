import { AddOperation } from '../../utils/AddOperation';
import { useParams } from 'react-router-dom';
import { OperationType } from '../../types/interfaces';

export const ExpenseForm = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className="expense-form">
      <AddOperation accountId={id} operationType={OperationType.EXPENSE} />
    </div>
  );
};
