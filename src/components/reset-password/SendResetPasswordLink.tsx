import React, { SyntheticEvent, useState } from 'react';
import { apiUrl } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../utils/toastify';
import { Spinner } from '../common/spinner/Spinner';
import { GoBackButton } from '../common/buttons/GoBackBtn';

export const SendResetPasswordLink = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const sendEmailId = 'sendEmailId';

  const sendEmail = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/email/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setError(data.message);
      }
      if (data.success) {
        Toast(`Link do zmiany hasła został wysłany!`, sendEmailId, 2000);
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="login-page background-image">
      <form className="d-flex reset-password-form" onSubmit={sendEmail}>
        <p className="text-center pt-3">
          Podaj adres email przypisany do Twojego konta
        </p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          maxLength={50}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && (
          <p className="text-center" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        <div className="row">
          <div className="col">
            <GoBackButton />
          </div>
          <div className="col">
            <button className="btn btn-primary">Wyślij </button>
          </div>
        </div>
      </form>
    </div>
  );
};
