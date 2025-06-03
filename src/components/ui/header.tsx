import React, { useEffect, useState } from "react";
import logo from "../../../public/logo.png"; 
import { VscAccount } from "react-icons/vsc";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for pending requests count in session storage
    const count = sessionStorage.getItem('pendingRequestsCount');
    if (count) {
      setNotificationCount(parseInt(count));
    }

    // Listen for storage changes to update the count
    const handleStorageChange = () => {
      const newCount = sessionStorage.getItem('pendingRequestsCount');
      if (newCount) {
        setNotificationCount(parseInt(newCount));
      } else {
        setNotificationCount(0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNotificationClick = () => {
    navigate('/dashboard/requests');
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-6 md:py-4 bg-[#e5e5e5] shadow-sm">
      {/* Logo on the left corner */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-32 object-contain" />
      </div>

      {/* Account and notification icons on the right corner */}
      <div className="flex items-center  gap-8 md:gap-4 text-[#6c6c6c]">
        <div className="relative">
          <FiBell 
            className="text-2xl cursor-pointer" 
            onClick={handleNotificationClick}
          />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </div>
        <VscAccount className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;