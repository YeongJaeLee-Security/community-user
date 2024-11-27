import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authcontext';

const LogIn = () => {
  const router = useRouter();
  const { logIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 오류 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 로그인 처리
      const response = await axios.post(
        'http://localhost:8000/auth/signin',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, // JWT 토큰 요청을 함께 보냄
        }
      );

      if (response.status === 200) {
        logIn(); // 로그인 상태 업데이트
        router.push('/'); // 메인 페이지로 이동
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
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 표시 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
