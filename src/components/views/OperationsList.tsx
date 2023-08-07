import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { Currency, NewOperationData } from '../../types/interfaces';
import ReactPaginate from 'react-paginate';
import { Spinner } from '../common/spinner/Spinner';
interface Props {
  currency: Currency;
}

const PER_PAGE = 6;

export const OperationsList = (props: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [operations, setOperations] = useState<NewOperationData[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/operations/all/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.statusCode === 401) {
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
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [currentPage]);

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
            <div className={`${isMobile ? 'col-6' : 'col-8'}`}>
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
            <div className={`${isMobile ? 'col-6' : 'col-4'} text-end`}>
              <div
                className={`${
                  isMobile ? 'd-grid mb-2' : 'd-flex justify-content-end mb-2'
                }`}
              >
                <button
                  className="btn btn-outline-dark btn-sm m-1"
                  onClick={() =>
                    navigate(`/edit-operation-form/${operation.id}`)
                  }
                >
                  Edytuj
                </button>
                <button
                  className="btn btn-outline-dark btn-sm m-1"
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
                <span className="text-wrap text-break">
                  {operation.value} {props.currency}
                </span>
              </p>
            </div>
          </div>
        </li>
      </div>
    ));

  const pageCount = Math.ceil(operations.length / PER_PAGE);

  const handleDeleteClick = async (elementId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/operations/${elementId}`, {
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
        window.location.reload();
        setOperations((operations) =>
          operations.filter((operation) => operation.id !== elementId),
        );
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorHandler message={error} />;
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {operations.length !== 0 ? (
        <div className="col-12 pt-3 filling">
          <div className="col border rounded border-dark">
            <div className="text-center my-3">
              <h5>Ostatnie operacje</h5>
            </div>
            <ul className="list-group mb-3">{currentPageData}</ul>
          </div>
          <div className="mb-5 pb-1">
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
        </div>
      ) : null}
    </>
  );
};
