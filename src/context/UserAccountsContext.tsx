import React, { createContext, useState } from 'react';
import { NewAccountEntity } from '../types/interfaces';

export const UserAccountsContext = createContext<
  | {
      accounts: NewAccountEntity[] | undefined;
      setAccounts: (accounts: NewAccountEntity[]) => void;
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

  return (
    <UserAccountsContext.Provider
      value={{
        accounts,
        setAccounts,
      }}
    >
      {properties.children}
    </UserAccountsContext.Provider>
  );
};
