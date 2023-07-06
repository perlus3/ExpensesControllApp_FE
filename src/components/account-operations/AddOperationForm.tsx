import { useNavigate, useParams } from 'react-router-dom';
import { CategoryEntity, OperationType } from '../../types/interfaces';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { Button, Modal } from 'react-bootstrap';
import { LogoutFunction } from '../logout/Logout';

export const AddOperationForm = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [operationType, setOperationType] = useState<
    OperationType | string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [form, setForm] = useState({
    name: '',
    value: '',
    categoryId: '',
    operationType: operationType,
  });

  const handleOperationTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOperationType(e.target.value);
  };

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/categories`, {
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

        if (!data.id) {
          setError(data.message);
        }
        setCategories(data);
      })();
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  const addOperation = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/operations/${id}/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...form,
          operationType: operationType,
        }),
      });
      const data = await res.json();
      if (data.statusCode === 401) {
        LogoutFunction();
        navigate('/login');
      }

      if (!data.message) {
        setModalIsOpen(false);
        window.location.reload();
      }
      if (!data.value) {
        setError(data.message);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: string | number) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };
  if (loading) {
    return <h2>Trwa dodawanie operacji...</h2>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="row d-flex justify-content-center pt-1">
      <div className="row">
        <div className="col pb-2">
          <Button
            className="btn btn-sm smaller-button btn-primary"
            onClick={() => setModalIsOpen(true)}
          >
            Dodaj nową operacje
          </Button>
          <Modal
            show={modalIsOpen}
            onHide={() => setModalIsOpen(false)}
            dialogClassName="custom-modal-width"
          >
            <Modal.Header closeButton>
              <Modal.Title>Dodaj nową operacje</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" onSubmit={addOperation}>
                <div className="row mb-3 text-center">
                  <h5>Wybierz typ operacji:</h5>
                </div>
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <div className="col-6">
                      <input
                        type="radio"
                        className="my-radio"
                        value={OperationType.INCOME}
                        checked={operationType === OperationType.INCOME}
                        onChange={handleOperationTypeChange}
                      />
                    </div>
                    <label className="mb-0">Przychód</label>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="d-flex align-items-center">
                    <div className="col-6">
                      <input
                        type="radio"
                        className="my-radio"
                        value={OperationType.EXPENSE}
                        checked={operationType === OperationType.EXPENSE}
                        onChange={handleOperationTypeChange}
                      />
                    </div>
                    <label className="mb-0">Wydatek</label>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Nazwa operacji"
                      required
                      maxLength={50}
                      value={form.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      name="value"
                      placeholder="Wpisz wartość operacji"
                      required
                      maxLength={50}
                      value={form.value}
                      onChange={(e) =>
                        updateForm('value', Number(e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-12 col-md-6">
                    <select
                      className="form-select"
                      name="categoryId"
                      value={form.categoryId}
                      onChange={(e) => updateForm('categoryId', e.target.value)}
                    >
                      <option>--wybierz--</option>
                      {operationType === 'INCOME'
                        ? categories
                            .filter((category) => category.type === 'INCOME')
                            .map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))
                        : categories
                            .filter((category) => category.type === 'EXPENSE')
                            .map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center text-center">
                  <div className="col">
                    <button className="btn btn-primary">Dodaj</button>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                Zamknij
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
