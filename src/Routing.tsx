import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/login/LoginForm';
import { RegisterForm } from './components/register/RegisterForm';
import { UserMainPageView } from './components/views/UserMainPageView';
import { AddNewAccountForm } from './components/views/AddNewAccountForm';
import { Logout } from './components/logout/Logout';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { AccountsList } from './components/views/AccountsList';
import { AddOperationForm } from './components/account-operations/AddOperationForm';
import { EditOperationForm } from './components/account-operations/EditOperationForm';
import { ErrorHandler } from './components/common/ErrorHandler';
import { EditAccountForm } from './components/account-operations/EditAccountForm';
import { DetailsView } from './components/views/DetailsView';
import { About } from './components/about/About';
import { EmailConfirm } from './components/email-confirm/EmailConfirm';
import { LandingPage } from './components/landing-page/LandingPage';
import { CreditsPage } from './components/credits/CreditsPage';
import { SingleAccountPage } from './components/views/SingleAccountPage';
import { SetResetPasswordLink } from './components/reset-password/SetResetPasswordLink';
import { ResetPassword } from './components/reset-password/ResetPassword';
import { Analysis } from './components/analysis/Analysis';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/credits" element={<CreditsPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/reset-password" element={<SetResetPasswordLink />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/email/confirm-email/:token" element={<EmailConfirm />} />
      <Route path="/error" element={<ErrorHandler message={''} />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<UserMainPageView />} />
        <Route path="/add-operation/:id" element={<AddOperationForm />} />
        <Route
          path="/edit-operation-form/:id"
          element={<EditOperationForm />}
        />
        <Route path="/edit-account-form/:id" element={<EditAccountForm />} />
        <Route path="/accounts/:id" element={<SingleAccountPage />} />
        <Route path="/new-account" element={<AddNewAccountForm />} />
        <Route path="/details/:id" element={<DetailsView />} />
        <Route path="/user" element={<AccountsList />} />
        <Route path="/log-out" element={<Logout />} />
        <Route path="/analysis" element={<Analysis />} />
      </Route>
    </Routes>
  );
};
