import React, { SyntheticEvent, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { Toast } from '../../utils/toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Spinner } from '../common/spinner/Spinner';
import { ErrorHandler } from '../common/ErrorHandler';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  useEffect(() => {
    (async () => {
      await fetch(`${apiUrl}/auth/log-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    })();
  }, []);

  const loginId = 'loggedIn';
  const badCredentialsId = 'badCredentialsId';
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...form,
        }),
      });

      const data = await res.json();
      if (data.userId) {
        Toast('Zalogowano poprawnie!', loginId, 1000);
        navigate(`/user`);
      }
      if (data.statusCode === 401) {
        Toast(`${data.message}`, badCredentialsId, 2000);
      }
      if (data.statusCode === 400) {
        Toast(`${data.message}`, badCredentialsId, 2000);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="login-page background-image">
      <form className="auth-form" onSubmit={loginUser}>
        <h1>Zaloguj się!</h1>
        <input
          type="text"
          name="login"
          placeholder="Login"
          required
          maxLength={50}
          value={form.login}
          onChange={(e) => updateForm('login', e.target.value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Hasło"
          required
          maxLength={50}
          value={form.password}
          onChange={(e) => updateForm('password', e.target.value)}
        />
        <div
          style={{
            position: 'absolute',
            right: '0.2em',
            top: '43%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '2.5em',
          }}
          onClick={handleToggle}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
        <p className="text-center small p-0 m-0">
          <Link style={{ color: 'blue' }} to="/reset-password">
            Przypomnij hasło!
          </Link>
        </p>
        <p className="text-center small p-0 m-0">
          Nie masz jescze konta?{' '}
          <Link style={{ color: 'blue' }} to="/register">
            Załóż konto TUTAJ!
          </Link>
        </p>
        <Link to="/about" className="btn btn-secondary w-50">
          O aplikacji!
        </Link>
        <button className="btn btn-primary w-50">Zaloguj</button>
      </form>
    </div>
  );
};
