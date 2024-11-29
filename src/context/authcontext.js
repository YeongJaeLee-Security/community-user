import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// 상태변수 초기화
const AuthContext = createContext({
  isLoggedIn: false,
  authId: undefined,
  logIn: () => {},
  logOut: () => {},
});

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authId, setAuthId] = useState(undefined);

  const checkLoginStatus = useCallback(async () => {
    try {
      const { status, data } = await axios.get("http://localhost:8000/loginstate", { withCredentials: true });
      setIsLoggedIn(status === 200);
      setAuthId(data.user_id);
    } catch (error) {
      if (error.response) {
        // This is a server-side error (status codes like 500, 404, etc.)
        console.error("서버 에러:", error.response.status, error.response.data);
      } else if (error.request) {
        // This is a network error or no response from the server
        console.error("네트워크 에러: 서버 응답이 없음");
      } else {
        // Something else happened during setting up the request
        console.error("알 수 없는 에러:", error.message);
      }
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const logIn = () => {
    // checkLoginStatus();
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setAuthId(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authId, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
