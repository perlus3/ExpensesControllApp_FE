import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/login/LoginForm';
import { RegisterForm } from './components/register/RegisterForm';
import { UserMainPageView } from './components/views/UserMainPageView';
import { AddNewAccountForm } from './components/views/AddNewAccountForm';
import { Logout } from './components/logout/Logout';
import { SingleAccountPage } from './components/views/SingleAccountPage';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { AccountsList } from './components/views/AccountsList';
import { IncomeForm } from './components/account-operations/IncomeForm';
import { ExpenseForm } from './components/account-operations/ExpenseForm';
import { ConfirmEmail } from './components/register/ConfirmEmail';

import { EditOperationForm } from './components/account-operations/EditOperationForm';
import { ErrorHandler } from './components/common/ErrorHandler';
import { EditAccountForm } from './components/account-operations/EditAccountForm';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/error" element={<ErrorHandler message={''} />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<UserMainPageView />} />
        <Route path="/income-form/:id" element={<IncomeForm />} />
        <Route path="/expense-form/:id" element={<ExpenseForm />} />
        <Route
          path="/edit-operation-form/:id"
          element={<EditOperationForm />}
        />
        <Route path="/edit-account-form/:id" element={<EditAccountForm />} />
        <Route path="/accounts/:id" element={<SingleAccountPage />} />
        <Route path="/new-account" element={<AddNewAccountForm />} />
        <Route path="/user/accounts" element={<AccountsList />} />
        <Route path="/log-out" element={<Logout />} />
      </Route>
    </Routes>
  );
};
