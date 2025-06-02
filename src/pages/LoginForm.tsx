import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
    const { primaryColor } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempted with:', { email, password });
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${isEmailFocused || email ? 'text-gray-700' : 'text-gray-400'}`}>
                        <Mail size={20} />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                        style={{
                            boxShadow: isEmailFocused ? `0 0 0 2px ${primaryColor}20` : 'none'
                        }}
                        required
                    />
                </div>

                <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${isPasswordFocused || password ? 'text-gray-700' : 'text-gray-400'}`}>
                        <Lock size={20} />
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                        style={{
                            boxShadow: isPasswordFocused ? `0 0 0 2px ${primaryColor}20` : 'none'
                        }}
                        required
                    />
                </div>

                <div className="text-right">
                    <a
                        href="#"
                        className="text-sm transition-colors duration-200 hover:underline"
                        style={{ color: primaryColor }}
                    >
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 text-white font-medium rounded-md transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                        backgroundColor: primaryColor,
                        boxShadow: `0 4px 6px ${primaryColor}40`
                    }}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default LoginForm;