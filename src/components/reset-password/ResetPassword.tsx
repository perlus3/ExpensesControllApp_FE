import React, { SyntheticEvent, useState } from 'react';
import { apiUrl } from '../../config/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from '../../utils/toastify';
import { Spinner } from '../common/spinner/Spinner';

export const ResetPassword = () => {
  const params = useParams();
  const { id, token } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const setNewPasswordId = 'setNewPasswordId';

  const changePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${apiUrl}/email/set-new-password/${id}/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password,
          }),
        },
      );
      const data = await res.json();
      if (data.message) {
        setError(data.message);
      }
      if (data.success) {
        Toast(`Hasło zostało zmienione!`, setNewPasswordId, 2000);
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
      <form className="reset-password-form" onSubmit={changePassword}>
        <p className="text-center">Wpisz nowe hasło dla swojego konta</p>
        <input
          type="text"
          name="password"
          placeholder="Nowe hasło"
          required
          maxLength={50}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-center" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        <div className="row">
          <div className="col">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Powrót
            </button>
          </div>
          <div className="col">
            <button className="btn btn-primary">Zapisz</button>
          </div>
        </div>
      </form>
    </div>
  );
};
