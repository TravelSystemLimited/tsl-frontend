import React from "react";
import logo from "../../../public/logo.png"; 
import { VscAccount } from "react-icons/vsc";// Make sure this path is correct or use 'next/image' if in Next.js

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="w-full flex justify-between items-center px-6 py-8 bg-[#e5e5e5] shadow-sm">
      {/* Logo and Text */}
      <div className="flex items-center space-x-3">
        {/* Logo Image */}
        <img src={logo} alt="Logo" className=" w-44 object-contain" />

        {/* Text Content */}
   
      </div>

      {/* User Section */}
      <div className="flex items-center space-x-2 text-[#6c6c6c]">
        <span className="text-sm ">{username}</span>
     <VscAccount className="text-3xl" />
      
      </div>
    </header>
  );
};

export default Header;
