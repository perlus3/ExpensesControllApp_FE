import React, { createContext, useState } from 'react';
import { NewAccountEntity } from '../types/interfaces';

export const AuthContext = createContext<
  | {
      user: any;
      setUser: (user: any) => void;
      token: string;
      setToken: (token: string) => void;
      accounts: NewAccountEntity[] | undefined;
      setAccounts: (accounts: NewAccountEntity[]) => void;
    }
  | undefined
>(undefined);

interface Properties {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Properties> = (properties) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  const [accounts, setAccounts] = useState<NewAccountEntity[] | undefined>(
    undefined,
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        accounts,
        setAccounts,
      }}
    >
      {properties.children}
    </AuthContext.Provider>
  );
};
