import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

export const TOKEN_STORAGE_KEY = 'BK_TOKEN';

// The context is intentionally exported alongside its provider for consumers.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  token: null,
  isAuthReady: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (saved) setToken(saved);
    } catch (err) {
      console.error('[Auth] Error leyendo localStorage:', err);
    } finally {
      setIsAuthReady(true);
    }
  }, []);

  const login = useCallback((newToken) => {
    setToken(newToken);
    try {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    } catch (err) {
      console.error('[Auth] Error escribiendo localStorage:', err);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (err) {
      console.error('[Auth] Error limpiando localStorage:', err);
    }
  }, []);

  const value = useMemo(
    () => ({ token, isAuthReady, login, logout }),
    [token, isAuthReady, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
