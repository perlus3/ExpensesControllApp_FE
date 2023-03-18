import React, { SyntheticEvent, useContext, useState } from 'react';
import { Btn } from '../common/Btn';

import './AuthForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';

export const LoginForm = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
      if (data.error) {
        setError(data);
      }
      userContext?.setToken(data.accessToken);
      userContext?.setUser(data.user);
      navigate(`/user`);
    } catch (e) {
      console.log('catch error', e);
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

  if (error) {
    navigate('/invalid_credentials', { replace: true });
  }

  return (
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
      <p>
        Nie masz jescze konta? <Link to="/register">Załóż konto TUTAJ!</Link>
      </p>
      <Btn text="Zaloguj" />
    </form>
  );
};
