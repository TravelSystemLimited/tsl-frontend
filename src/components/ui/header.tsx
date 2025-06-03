import React from "react";
import logo from "../../../public/logo.png"; 
import { VscAccount } from "react-icons/vsc";

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="w-full flex justify-between items-center px-6 py-6 md:py-4 bg-[#e5e5e5] shadow-sm">
      {/* Logo on the left corner */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-32 object-contain" />
      </div>

      {/* Account icon on the right corner */}
      <div className="flex items-center text-[#6c6c6c]">
        <VscAccount className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;