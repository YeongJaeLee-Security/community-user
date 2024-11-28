import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authcontext';
import { Box, Button, Typography, TextField, Alert } from '@mui/material';


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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Log In
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#FF4500",
          "&:hover": { bgcolor: "#e03e00" },
          fontWeight: "bold",
        }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LogIn;
