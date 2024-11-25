// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// // AuthContext Provider
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  
//   const logIn = () => setIsLoggedIn(true);  // 로그인 처리
//   const logOut = () => setIsLoggedIn(false); // 로그아웃 처리
  
//   useEffect(() => {

//     // 페이지가 로드될 때 쿠키에서 로그인 상태 확인
//     console.log("페이지 로드되어서 체크 시작함")
//     const checkLoginStatus = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/loginstate", { withCredentials: true });
//         if (response.status === 200) {
//           setIsLoggedIn(true); // 로그인 상태로 설정
//           console.log("check success")
//         }
//       } catch (error) {
//         setIsLoggedIn(false); // 로그인되지 않은 상태
//         console.log("체크에러", error)
//       }
//     };
//     checkLoginStatus();
    
//   }, []);

   
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
        console.log("로그인 상태 확인 성공");
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error.message);
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
