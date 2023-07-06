import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { Currency, NewOperationData } from '../../types/interfaces';
import ReactPaginate from 'react-paginate';
import { LogoutFunction } from '../logout/Logout';
interface Props {
  id: string | undefined;
  count: number;
  setCount: (count: any) => void;
  currency: Currency;
}

const PER_PAGE = 8;

export const AccountOperationsListView = (props: Props) => {
  const { setCount } = props;
  const navigate = useNavigate();
  const [operations, setOperations] = useState<NewOperationData[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/operations/all/${props.id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.statusCode === 401) {
          LogoutFunction();
          navigate('/login');
        }
        if (!data.name) {
          setError(data.message);
        }
        setOperations(data);
      })();
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  if (!operations) {
    return null;
  }

  const newDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const currentPageData = operations
    .slice(offset, offset + PER_PAGE)
    .map((operation) => (
      <div key={operation.id} className="container">
        <li
          className="list-group-item background-color border-dark mb-2"
          key={operation.id}
        >
          <div className="row align-items-center">
            <div className="col-8">
              <p className="small text-muted">{newDate(operation.createdAt)}</p>
              <span className="text-capitalize fw-bold">{operation.name}</span>
              <p
                className={`m-0 small text-${
                  operation.operationType === 'EXPENSE' ? 'danger' : 'success'
                }`}
              >
                {operation.category.name}
              </p>
            </div>
            <div className="col-4 text-end">
              <div className="d-flex justify-content-end mb-2">
                <button
                  className="btn btn-outline-dark btn-sm me-2"
                  onClick={() =>
                    navigate(`/edit-operation-form/${operation.id}`)
                  }
                >
                  Edytuj
                </button>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => handleDeleteClick(operation.id)}
                >
                  Usuń
                </button>
              </div>
              <p
                className={`m-0 fw-bold text-${
                  operation.operationType === 'EXPENSE' ? 'danger' : 'success'
                }`}
              >
                {operation.value} {props.currency}
              </p>
            </div>
          </div>
        </li>
      </div>
    ));

  const pageCount = Math.ceil(operations.length / PER_PAGE);

  const handleDeleteClick = async (elementId: string) => {
    const res = await fetch(`${apiUrl}/operations/${elementId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.statusCode === 401) {
      LogoutFunction();
      navigate('/login');
    }

    if (data.affected) {
      setCount((prevCount: number) => prevCount + 1);
      setOperations((operations) =>
        operations.filter((operation) => operation.id !== elementId),
      );
    }
  };

  if (error) {
    return <ErrorHandler message={error} />;
  }
  return (
    <div className="col-12 pt-3">
      <div className="col border rounded border-dark">
        <div className="text-center mt-3">
          <h5>Ostatnie operacje</h5>
        </div>
        <ul className="list-group mb-3">{currentPageData}</ul>
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination-link'}
        nextLinkClassName={'pagination-link'}
        disabledClassName={'pagination-link-disabled'}
        activeClassName={'pagination-link-active'}
      />
    </div>
  );
};
