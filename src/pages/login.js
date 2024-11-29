import React, { useEffect } from 'react';
import UserAuth from '../components/userauth'; 
import { Box } from '@mui/material';
import { useAuth } from "@/context/authcontext";
import { useRouter } from 'next/router'; 

const Login = () => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/'); // 로그인 상태면 /로 리다이렉트
    }
  }, [isLoggedIn, router]);

  return (
    <Box>
      <UserAuth />  {/* UserAuth 컴포넌트 렌더링 */}
    </Box>
  );
};

export default Login;
