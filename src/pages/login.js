import React from 'react';
import UserAuth from '../components/userauth';  // UserAuth 컴포넌트 import
import { Box, Typography } from '@mui/material';

const Login = () => {
  return (
    <Box>
      <UserAuth />  {/* UserAuth 컴포넌트 렌더링 */}
    </Box>
  );
};

export default Login;