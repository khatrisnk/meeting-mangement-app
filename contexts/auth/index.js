import { createContext, useMemo, useEffect, useState } from "react";
import { postData } from '../../utils';
import Router, { useRouter } from 'next/router';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    setAuthState(!!isAuthenticated);
  }, [])

  // useEffect(() => {
  //   authState && router.push('/dashboard')
  // }, [authState])
  
  const login = async (email, password) => {
    const res = await postData("/api/login", { email, password });
    sessionStorage.setItem('isAuthenticated', res.status === 200);
    setAuthState(res.status === 200);
    return res;
  };

  const memoValue = useMemo(() => {
    return {
      isAuthenticated: authState,
      login
    }
  }, [authState, login])

  return (
    <AuthContext.Provider value={memoValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
