import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.currentTarget as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
    
    if (email.value === "manager@gmail.com") {
      navigate("/manager");
    }else{
        navigate("/flights");
    }
    // Add other email checks or authentication logic here
  };

  return (
    <div className="flex h-screen">
      {/* Left Section - Logo */}
      <div className="w-1/2 flex items-center justify-center border-r">
        <div className="text-center">
          {/* Replace with your actual logo image */}
          <img src="/logo.png" alt="Travel Systems Logo" className="h-20 mx-auto mb-4" />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h2 className="text-center text-lg font-medium text-gray-800 mb-6">Sign In</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16 12H8m0 0l4-4m-4 4l4 4"/>
                </svg>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address"
                  className="w-full outline-none text-sm bg-transparent" 
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zM7 10V6a5 5 0 0110 0v4"/>
                </svg>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password"
                  className="w-full outline-none text-sm bg-transparent" 
                  required
                />
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">
                <a href="#" className="hover:underline">Forgot password?</a>
              </div>
            </div>

            {/* Sign In Button */}
            <button type="submit"
                    className="w-full bg-[#7e5a5a] hover:bg-[#6d4f4f] text-white py-2 rounded">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;