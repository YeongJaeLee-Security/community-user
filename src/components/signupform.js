import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUp = ({setIsLoginPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validatePassword = (pw) => {
    // 비밀번호 정책: 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pw);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }
  
    axios.post(
      'http://localhost:8000/auth/signup',
      { email, password, username },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(response => {
      if (response.status === 201) {
        alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
        setIsLoginPage(true);
      }
    })
    .catch (err => {
      if (err.response && err.response.data) {
        setError(err.response.data.detail); // 서버 에러 메시지
      } else {
        setError('요청 처리에 실패했습니다.');
      };
    });
}

  return (
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
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
