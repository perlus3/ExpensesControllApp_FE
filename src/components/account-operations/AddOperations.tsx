import { AddOperation } from '../../utils/AddOperation';
import { useParams } from 'react-router-dom';
import { OperationType } from '../../types/interfaces';
import { ChangeEvent, useState } from 'react';

export const AddOperations = () => {
  const params = useParams();
  const { id } = params;

  const [operationType, setOperationType] = useState<
    OperationType | string | null
  >(null);
  const handleOperationTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOperationType(e.target.value);
  };

  console.log(id);

  return (
    <div className="container">
      <div className="col">
        <form action="">
          Wybierz typ operacji:
          <div className="row">
            <label>
              <input
                type="radio"
                value={OperationType.INCOME}
                checked={operationType === OperationType.INCOME}
                onChange={handleOperationTypeChange}
              />
              Przychód
            </label>
          </div>
          <div className="row">
            <label>
              <input
                type="radio"
                value={OperationType.EXPENSE}
                checked={operationType === OperationType.EXPENSE}
                onChange={handleOperationTypeChange}
              />
              Wydatek
            </label>
          </div>
        </form>
      </div>

      {operationType !== null ? (
        <AddOperation accountId={id} operationType={operationType} />
      ) : undefined}
    </div>
  );
};
