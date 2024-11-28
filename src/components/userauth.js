import React, { useState } from 'react';
import SignUp from './signupform';
import LogIn from './loginform';
import { Box, Button } from '@mui/material';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch", // 자식 컴포넌트 너비에 맞춤
        maxWidth: 400, // 전체 너비 제한
        width: "100%", // 부모 컨테이너의 전체 너비를 사용
        mx: "auto",
        gap: 2,
      }}
    >
      <Box
        sx={{
          flexGrow: 1, // 자식 컴포넌트의 크기를 자연스럽게 유지
        }}
      >
        {isLogin ? <LogIn /> : <SignUp />}
      </Box>
      
      <Button
        variant="contained"
        onClick={toggleForm}
        fullWidth
        sx={{
          bgcolor: "#FF4500",
          "&:hover": { bgcolor: "#e03e00" },
          fontWeight: "bold",
        }}
      >
        {isLogin ? "Create an Account" : "Already have an account? Log In"}
      </Button>
    </Box>
  );
};

export default UserAuth;
