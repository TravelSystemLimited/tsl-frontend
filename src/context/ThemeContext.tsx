import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

type ThemeType = 'tsl' | 's2c' | 'default';

interface ThemeContextType {
    currentTheme: ThemeType;
    primaryColor: string;
    logoText: string;
    imageUrl: string;
}

const themeConfig = {
    tsl: {
        primaryColor: '#8C6D73',
        logoText: 'TSL',
        imageUrl:
            'https://cordestitch.s3.ap-south-1.amazonaws.com/white-label/TravelSysytem-Logo-1024x226.png',
    },
    s2c: {
        primaryColor: '#FEA802',
        logoText: 'S2C',
        imageUrl:
            'https://cordestitch.s3.ap-south-1.amazonaws.com/white-label/screenshot.png',
    },
    default: {
        primaryColor: '#5A67D8',
        logoText: 'Company',
        imageUrl: '',
    },
};

const ThemeContext = createContext<ThemeContextType>({
    currentTheme: 'default',
    primaryColor: themeConfig.default.primaryColor,
    logoText: themeConfig.default.logoText,
    imageUrl: themeConfig.default.logoText,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');

    useEffect(() => {
        const hostname = window.location.hostname.toLowerCase();
        const pathname = window.location.pathname.toLowerCase();

        if (pathname.startsWith('/s2c')) {
            setCurrentTheme('s2c');
        } else if (hostname.includes('tsl')) {
            setCurrentTheme('tsl');
        } else {
            setCurrentTheme('default');
        }
    }, []);


    const value = {
        currentTheme,
        primaryColor: themeConfig[currentTheme].primaryColor,
        logoText: themeConfig[currentTheme].logoText,
        imageUrl: themeConfig[currentTheme].imageUrl,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
