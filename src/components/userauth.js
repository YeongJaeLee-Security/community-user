import React, { useState } from 'react';
import SignUp from './signupform';
import LogIn from './loginform';

const UserAuth = () => {
  
  const [isLoginPage, setIsLoginPage] = useState(true);
  const togglePage = () => setIsLoginPage(!isLoginPage);

  return (
    <div>
      {isLoginPage ? <LogIn /> : <SignUp setIsLoginPage={setIsLoginPage} />}
      <button onClick={togglePage} style={{ marginTop: '10px' }}>
        {isLoginPage ? 'Create an Account' : 'Already have an account? Log In'}
      </button>
    </div>
  );
};

export default UserAuth;
