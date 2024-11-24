import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const logIn = () => setIsLoggedIn(true);  // 로그인 처리
  const logOut = () => setIsLoggedIn(false); // 로그아웃 처리
   
  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
