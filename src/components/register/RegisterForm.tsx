import React, { SyntheticEvent, useState } from 'react';

import '../login/AuthForm.css';
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../common/buttons/GoBackBtn';
import { apiUrl } from '../../config/api';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [form, setForm] = useState({
    login: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const registerUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        signal,
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

      if (!data.login) {
        setError(data.message);
      }

      if (!data.message) {
        navigate('/after-register');
      }
    } catch (err: any) {
      setError(err.message);
      if (err.name === 'AbortError') {
        console.log('cancelled');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  const updateForm = (key: string, value: string) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  if (loading) {
    return <h2>Trwa rejestracja użytkownika...</h2>;
  }

  return (
    <div className="register-form background-image vh-100">
      <form className="auth-form" action="" onSubmit={registerUser}>
        <h2>Załóż konto!</h2>
        <div className="form-floating w-100">
          <input
            id="login"
            type="text"
            name="login"
            placeholder="Login"
            required
            maxLength={50}
            value={form.login}
            className="form-control"
            onChange={(e) => updateForm('login', e.target.value)}
          />
          <label htmlFor="login">Login</label>
        </div>
        <div className="form-floating w-100">
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            required
            maxLength={50}
            value={form.email}
            className="form-control"
            onChange={(e) => updateForm('email', e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating w-100">
          <input
            id="password"
            type="text"
            name="password"
            placeholder="Hasło"
            required
            maxLength={50}
            value={form.password}
            className="form-control"
            onChange={(e) => updateForm('password', e.target.value)}
          />
          <label htmlFor="password">Hasło</label>
        </div>
        <div className="form-floating w-100">
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Imię"
            required
            maxLength={50}
            value={form.firstName}
            className="form-control"
            onChange={(e) => updateForm('firstName', e.target.value)}
          />
          <label htmlFor="firstName">Imię</label>
        </div>
        <div className="form-floating w-100">
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Nazwisko"
            required
            maxLength={50}
            value={form.lastName}
            className="form-control"
            onChange={(e) => updateForm('lastName', e.target.value)}
          />
          <label htmlFor="lastName">Nazwisko</label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="btn btn-primary w-50">Zarejestruj się</button>
        <GoBackButton />
      </form>
    </div>
  );
};
