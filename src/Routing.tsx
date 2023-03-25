import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/login/LoginForm';
import { BadCredentials } from './components/login/BadCredentials';
import { RegisterForm } from './components/register/RegisterForm';
import { UserMainPageView } from './components/views/UserMainPageView';
import { AddNewAccount } from './components/views/AddNewAccount';
import { Logout } from './components/logout/Logout';
import { SingleAccountPage } from './components/views/SingleAccountPage';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { AccountsList } from './components/views/AccountsList';
import { IncomeForm } from './components/account-operations/IncomeForm';
import { ExpenseForm } from './components/account-operations/ExpenseForm';
import { ConfirmEmail } from './components/register/ConfirmEmail';
export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/invalid_credentials" element={<BadCredentials />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<UserMainPageView />} />
        <Route path="/income-form/:id" element={<IncomeForm />} />
        <Route path="/expense-form/:id" element={<ExpenseForm />} />
        <Route path="/accounts/:id" element={<SingleAccountPage />} />
        <Route path="/new-account" element={<AddNewAccount />} />
        <Route path="/user/accounts" element={<AccountsList />} />
        <Route path="/log-out" element={<Logout />} />
      </Route>
    </Routes>
  );
};
