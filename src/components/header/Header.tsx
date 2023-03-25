import React from 'react';

import { Btn } from '../common/buttons/Btn';

export const Header = () => {
  return (
    <div className="header">
      <header>
        <nav>
          <Btn to="/user/accounts" text="Moje Konta"></Btn>
          <Btn to="/new-account" text="Dodaj nowe konto"></Btn>
          <Btn to="/log-out" text="Wyloguj"></Btn>
        </nav>
      </header>
    </div>
  );
};
