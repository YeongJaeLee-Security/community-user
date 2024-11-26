import React from 'react';
import UserAuth from '../components/userauth';  // UserAuth 컴포넌트 import

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <UserAuth />  {/* UserAuth 컴포넌트 렌더링 */}
    </div>
  );
};

export default Login;