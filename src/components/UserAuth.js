import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserAuth = () => {
  const { isLoggedIn, logOut } = useAuth(); // AuthContext에서 상태와 로그아웃 함수 가져오기
  const router = useRouter();

  //로그아웃 요청
  const handleLogOut = async () => {
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
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  const handleLogIn = () => {
    router.push('/login'); // 로그인 페이지로 이동
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      {/* 로그인 상태에 따라 버튼내용 변경 */}
      {isLoggedIn ? (
        <button onClick={handleLogOut}>Logout</button>
      ) : (
        <button onClick={handleLogIn}>Login</button>
      )}
    </div>
  );
};

export default UserAuth;