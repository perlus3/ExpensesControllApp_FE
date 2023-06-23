import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { Link, useParams } from 'react-router-dom';
import { ErrorHandler } from '../common/ErrorHandler';

export const EmailConfirm = () => {
  const params = useParams();
  const { token } = params;
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/email/confirm-email`, {
          signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        });
        const data = await res.json();
        if (data.message) {
          setError(data.message);
        }
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

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="text-center text-success fs-2 mt-3">
            Email potwierdzono prawidłowo!
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <button className="d-flex justify-center btn btn-secondary mt-3 w-25">
          <Link to="/">Wróć do panelu logowania</Link>
        </button>
      </div>
    </div>
  );
};
