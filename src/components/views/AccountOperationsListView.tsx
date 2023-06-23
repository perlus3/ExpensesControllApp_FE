import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

import { apiUrl } from '../../config/api';

import remove from '../../assets/icons/remove.png';
import update123 from '../../assets/icons/update123.png';
import { ErrorHandler } from '../common/ErrorHandler';
import { Currency, NewOperationData } from '../../types/interfaces';
interface Props {
  id: string | undefined;
  count: number;
  setCount: (count: any) => void;
  currency: Currency;
}

export const AccountOperationsListView = (props: Props) => {
  const userContext = useContext(AuthContext);
  const { setCount } = props;
  const navigate = useNavigate();
  const [operations, setOperations] = useState<NewOperationData[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/operations/all/${props.id}`, {
          signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext?.token}`,
          },
        });
        const data = await res.json();
        if (!data.name) {
          setError(data.message);
        }
        setOperations(data);
      })();
    } catch (err: any) {
      setError(err.message);
      if (err.name === 'AbortError') {
        console.log('cancelled');
      } else {
        setError(err.message);
      }
    }

    return () => {
      controller.abort();
    };
  }, []);

  if (!operations) {
    return null;
  }

  const handleDeleteClick = async (elementId: string) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const res = await fetch(`${apiUrl}/operations/${elementId}`, {
      signal,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext?.token}`,
      },
    });
    const data = await res.json();

    if (data.affected) {
      setCount((prevCount: number) => prevCount + 1);
      setOperations((operations) =>
        operations.filter((operation) => operation.id !== elementId),
      );
    }
    return () => {
      controller.abort();
    };
  };

  const newDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const today = new Date().toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="col-12">
      <div>{today}</div>
      <ul className="list-group mt-2">
        {operations.map((operation) => (
          <div key={operation.id} className="container">
            <li
              className="list-group-item list-group-item-light "
              key={operation.id}
            >
              <div className="row text-start">
                <div className="col-9">
                  <p className="small text-muted">
                    {newDate(operation.createdAt)}
                  </p>
                </div>
                <div className="col-3 text-end btn-group">
                  <button
                    className="btn btn-warning"
                    style={{
                      backgroundImage: `url(${update123})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                    }}
                    onClick={() =>
                      navigate(`/edit-operation-form/${operation.id}`)
                    }
                  >
                    <img src="../../assets/icons/update123.png" alt="" />
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{
                      backgroundImage: `url(${remove})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                    }}
                    onClick={() => handleDeleteClick(operation.id)}
                  >
                    <img src="../../assets/icons/remove.png" alt="" />
                  </button>
                </div>
                <div className="row mt-2">
                  <div className="col-9 text-start">
                    <span className="text-capitalize fw-bold ">
                      {operation.name}
                    </span>
                  </div>
                  <div className="col text-end">
                    <p
                      style={{
                        color:
                          operation.operationType === 'EXPENSE'
                            ? 'red'
                            : 'green',
                      }}
                    >
                      {operation.value} {props.currency}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
