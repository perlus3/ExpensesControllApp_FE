import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/login/LoginForm';
import { BadCredentials } from './components/login/BadCredentials';
import { RegisterForm } from './components/register/RegisterForm';
import { MainPageView } from './components/userPage/MainPageView';
import { AuthContext } from './contexts/authContext';
export const Routing = () => {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/invalid_credentials" element={<BadCredentials />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/user" element={<MainPageView />} />
      </Routes>
    </div>
  );
};
