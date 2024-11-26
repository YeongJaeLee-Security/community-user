import React from 'react';
import { useAuth } from '../context/authcontext';  // 로그인 상태와 로그아웃 함수 가져오기
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthButton = () => {
  const { isLoggedIn, logOut } = useAuth();  // 로그인 상태 및 로그아웃 함수
  const router = useRouter();

  // 로그아웃 처리 함수
  const handleLogOut = async() => {
    try {
        // 서버로 로그아웃 요청 보내기
        const response = await axios.post(
          'http://localhost:8000/auth/logout',  // 로그아웃 API 엔드포인트
          {},
          { withCredentials: true }  // 쿠키를 포함한 요청을 보내기 위해 withCredentials 설정
        );
        console.log(response.data.message);  // 서버로부터 반환된 로그아웃 메시지 출력
        logOut();  // AuthContext에서 로그아웃 상태 처리
        alert('로그아웃 되었습니다.');
        router.push('/');
    } 
    catch (error) {
        console.error('로그아웃 오류:', error);
    }
   
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={handleLogOut}>Logout</button> 
      ) : (
        <button onClick={() => router.push('/login')}>Login</button>  
      )}
    </>
  );
};

export default AuthButton;
