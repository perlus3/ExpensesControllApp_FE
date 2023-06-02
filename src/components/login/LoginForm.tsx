import React, { SyntheticEvent, useContext, useState } from 'react';

import './AuthForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';

export const LoginForm = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const loginUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },

        body: JSON.stringify({
          ...form,
        }),
      });
      const data = await res.json();
      if (!data.accessToken) {
        setError(data.message);
      }
      if (!data.message) {
        userContext?.setToken(data.accessToken);
        userContext?.setUser(data.user);
        navigate(`/user`);
      }
    } catch (e: any) {
      setError(e.message);
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
    return <h2>Trwa logowanie do aplikacji...</h2>;
  }

  return (
    <div className="login-page background-image">
      <form className="auth-form" action="" onSubmit={loginUser}>
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
          type="password"
          name="password"
          placeholder="Hasło"
          required
          maxLength={50}
          value={form.password}
          onChange={(e) => updateForm('password', e.target.value)}
        />
        {error && (
          <p className="text-center" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        <p>
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
