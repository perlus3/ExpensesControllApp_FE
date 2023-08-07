import React, { createContext, useState } from 'react';
import { NewAccountEntity } from '../types/interfaces';

export const UserAccountsContext = createContext<
  | {
      accounts: NewAccountEntity[] | undefined;
      setAccounts: (accounts: NewAccountEntity[]) => void;
      accountValue: number;
      setAccountValue: (accValue: number) => void;
    }
  | undefined
>(undefined);

interface Properties {
  children: React.ReactNode;
}
export const UserAccountsProvider: React.FC<Properties> = (properties) => {
  const [accounts, setAccounts] = useState<NewAccountEntity[] | undefined>(
    undefined,
  );
  const [accountValue, setAccountValue] = useState<number>(0);

  return (
    <UserAccountsContext.Provider
      value={{
        accounts,
        setAccounts,
        accountValue,
        setAccountValue,
      }}
    >
      {properties.children}
    </UserAccountsContext.Provider>
  );
};
