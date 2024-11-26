import React, { useState } from 'react';
import SignUp from './signupform';
import LogIn from './loginform';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div>
      {isLogin ? <LogIn /> : <SignUp />}
      <button onClick={toggleForm} style={{ marginTop: '10px' }}>
        {isLogin ? 'Create an Account' : 'Already have an account? Log In'}
      </button>
    </div>
  );
};

export default UserAuth;
