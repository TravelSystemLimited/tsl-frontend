import React from 'react';
import Logo from '../components/Logo';
import LoginForm from './LoginForm';


const Login: React.FC = () => {
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Logo */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12  md:border-b-0 md:border-r border-gray-200">
        <div className="max-w-sm w-full">
          <Logo />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;