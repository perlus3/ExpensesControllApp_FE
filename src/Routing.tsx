import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/login/LoginForm';
import { RegisterForm } from './components/register/RegisterForm';
import { UserMainPageView } from './components/views/UserMainPageView';
import { AddNewAccountForm } from './components/views/AddNewAccountForm';
import { Logout } from './components/logout/Logout';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { AccountsListView } from './components/views/AccountsListView';
import { AddOperationForm } from './components/account-operations/AddOperationForm';
import { AfterRegisterInfo } from './components/register/AfterRegisterInfo';
import { EditOperationForm } from './components/account-operations/EditOperationForm';
import { ErrorHandler } from './components/common/ErrorHandler';
import { EditAccountForm } from './components/account-operations/EditAccountForm';
import { DetailsView } from './components/views/DetailsView';
import { About } from './components/about/About';
import { EmailConfirm } from './components/emailConfirm/EmailConfirm';
import { LandingPage } from './components/landingPage/LandingPage';
import { CreditsPage } from './components/credits/CreditsPage';
import { BlankComponent } from './components/views/Blank';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/credits" element={<CreditsPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/email/confirm-email/:token" element={<EmailConfirm />} />
      <Route path="/after-register" element={<AfterRegisterInfo />} />
      <Route path="/error" element={<ErrorHandler message={''} />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<UserMainPageView />} />
        <Route path="/add-operation/:id" element={<AddOperationForm />} />
        <Route
          path="/edit-operation-form/:id"
          element={<EditOperationForm />}
        />
        <Route path="/edit-account-form/:id" element={<EditAccountForm />} />
        <Route path="/accounts/:id" element={<BlankComponent />} />
        <Route path="/new-account" element={<AddNewAccountForm />} />
        <Route path="/details/:id" element={<DetailsView />} />
        <Route path="/user/accounts" element={<AccountsListView />} />
        <Route path="/log-out" element={<Logout />} />
      </Route>
    </Routes>
  );
};
