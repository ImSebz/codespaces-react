import { useState } from 'react';

// Custom hook para manejar la autenticación
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (username, password) => {
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1500)); // Timeout para simular carga en login

    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } else {
      setError('Usuario o contraseña incorrectos');
      setIsLoading(false);
      return false;
    }
  };

//  Cierre de sesión
  const logout = () => {
    setIsAuthenticated(false);
    setError('');
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
};
