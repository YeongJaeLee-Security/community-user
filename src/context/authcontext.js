import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 상태변수 초기화 
const AuthContext = createContext({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { status } = await axios.get("http://localhost:8000/loginstate", { withCredentials: true });
        setIsLoggedIn(status === 200);
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
    };
    
    checkLoginStatus();
  }, []);
  
  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
