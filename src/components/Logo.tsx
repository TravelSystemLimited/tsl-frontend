import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CircleUser } from 'lucide-react';


const Logo: React.FC = () => {
    const { currentTheme, logoText, imageUrl } = useTheme();

    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center">
                <div className="text-3xl font-bold tracking-wider">
                    {currentTheme === 'tsl' ? (
                        <div className="flex items-center">
                            <img src={imageUrl} />
                        </div>
                    ) : currentTheme === 's2c' ? (
                        <div className="flex items-center">
                            <img src={imageUrl} alt="" />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <CircleUser size={36} className="mr-2" />
                            <span>{logoText}</span>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Logo;