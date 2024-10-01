import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string;
  saveToken: (newToken: string) => void;
  clearToken: () => void;
}

// Define um valor padrão para o contexto
const defaultContextValue: AuthContextType = {
  token: '',
  saveToken: () => { },
  clearToken: () => { },
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(() => Cookies.get('token') || '');

  const saveToken = (newToken: string) => {
    Cookies.set('token', newToken, { expires: 7, secure: true, sameSite: 'Strict' });
    setToken(newToken);
  };

  const clearToken = () => {
    Cookies.remove('token');
    setToken('');
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
