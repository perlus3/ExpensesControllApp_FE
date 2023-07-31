import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorHandler } from '../common/ErrorHandler';
import { Toast } from '../../utils/toastify';
import { Spinner } from '../common/spinner/Spinner';

export const EmailConfirm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const confirmSuccessId = 'confirmSuccessId';

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/email/confirm-email`, {
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
        if (data.success) {
          Toast(`Adres email potwierdzony!`, confirmSuccessId, 2000);
          navigate('/login');
        }
      })();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }
  return <></>;
};
