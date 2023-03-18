import React, { SyntheticEvent, useState } from 'react';
import { Btn } from '../common/Btn';

import '../login/AuthForm.css';

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
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

    try {
      await fetch(`http://localhost:3000/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
        }),
      });
    } catch (e) {
      console.log(e);
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
    return <h2>Trwa rejestracja użytkownika...</h2>;
  }

  return (
    <form className="auth-form" action="" onSubmit={registerUser}>
      <h1>Załóż konto!</h1>
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
        type="text"
        name="email"
        placeholder="Email"
        required
        maxLength={50}
        value={form.email}
        onChange={(e) => updateForm('email', e.target.value)}
      />
      <input
        type="text"
        name="password"
        placeholder="Hasło"
        required
        maxLength={50}
        value={form.password}
        onChange={(e) => updateForm('password', e.target.value)}
      />
      <input
        type="text"
        name="firstName"
        placeholder="Imię"
        required
        maxLength={50}
        value={form.firstName}
        onChange={(e) => updateForm('firstName', e.target.value)}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Nazwisko"
        required
        maxLength={50}
        value={form.lastName}
        onChange={(e) => updateForm('lastName', e.target.value)}
      />
      <Btn text="Zarejestruj się!" />
    </form>
    //@Todo obluga odpowiedzi w sensie jak error to wyswietlic info z
    //mozliwoscia powrotu do okna rejestracji. jesli status ok to dac info o
    //wyslanym linku do aktywacji konta zrobic w ogole przycisk powrotu do
    //strony logowania
  );
};
