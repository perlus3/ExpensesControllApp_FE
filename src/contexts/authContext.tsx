import React, { createContext, useState } from 'react';

export const AuthContext = createContext<
  | {
      user: any;
      setUser: (user: any) => void;
      token: string;
      setToken: (token: string) => void;
    }
  | undefined
>(undefined);

interface Properties {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Properties> = (properties) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {properties.children}
    </AuthContext.Provider>
  );
};
