import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserAuth from '@/components/UserAuth';

const AuthForm = () => {
  const router = useRouter();
  const { logIn } = useAuth(); // 로그인 상태 업데이트 함수
  const [isLogin, setIsLogin] = useState(true); // 현재 화면 (true: 로그인, false: 회원가입)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // 회원가입에서 사용
  const [error, setError] = useState('');
 

  
  const toggleForm = () => {
    setError('');
    setIsLogin((prev) => !prev); // 로그인 ↔ 회원가입 토글
  };

  const cancle =()=>{router.push('/')} // 취소하고 홈으로 


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        // 로그인 처리
        const response = await axios.post(
          'http://localhost:8000/auth/signin',
          { email, password },
          { headers: { 'Content-Type': 'application/json' },
            withCredentials: true // JWT 토큰 요청을 함께 보냄
          }
        );

        if (response.status === 200) {
          logIn(); // 로그인 상태 업데이트
          router.push('/'); // 메인 페이지로 이동
        }
      } else {
        // 회원가입 처리
        const response = await axios.post(
          'http://localhost:8000/auth/signup',
          { email, password, username },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 201) {
          alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
          setIsLogin(true); // 로그인 화면으로 전환
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail); // 서버 에러 메시지
      } else {
        setError('요청 처리에 실패했습니다.');
      }
    }
  };

    

  return (
    <div>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="username">Username:</label><br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">E-mail:</label><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        <button onClick={cancle}>cancle</button>
      </form>
      <button onClick={toggleForm} style={{ marginTop: '10px' }}>
        {isLogin ? 'Create an Account' : 'Already have an account? Log In'}
      </button>
    </div>
  );
};

export default AuthForm;
