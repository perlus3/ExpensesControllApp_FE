import { AddOperation } from '../../utils/AddOperation';
import { useParams } from 'react-router-dom';
import { OperationType } from '../../types/interfaces';

export const IncomeForm = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className="income-form">
      <AddOperation accountId={id} operationType={OperationType.INCOME} />
    </div>
  );
};
