<<<<<<< HEAD
import React, { useContext, useState, createContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
=======
import React, { useContext, useState, createContext, useEffect } from "react";
import { Flowbite } from 'flowbite-react';
>>>>>>> 79b4188b702d33111a45ca0bdf5ff5df4f5cb386

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const isMediumScreen = useMediaQuery({ query: `(min-width: 760px)` });

	useEffect(() => {
		if (localStorage.getItem('theme') === 'dark') setIsDarkMode(true);
	}, [isDarkMode]);

	useEffect(() => {
		if (!isMediumScreen) {
			setActiveMenu(false);
		}
	}, [isMediumScreen]);

<<<<<<< HEAD
	const toggleDarkMode = () => {
		const currentMode = !isDarkMode;
		setIsDarkMode(currentMode);
		if (currentMode) localStorage.setItem('theme', 'dark');
		else localStorage.setItem('theme', 'light');
	};

	return (
		<ThemeContext.Provider
			value={{
				activeMenu,
				setActiveMenu,
				isDarkMode,
				toggleDarkMode,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
=======
  const customTheme = {
    button: {
      color: {
        primary: ' border-2 bg-green-accent border-green-variant text-lg text-whitegray font-semibold rounded-full',
        profile: 'rounded-full'
        
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <ThemeContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          isDarkMode,
          toggleDarkMode,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </Flowbite >
  );
>>>>>>> 79b4188b702d33111a45ca0bdf5ff5df4f5cb386
};

export const useThemeContext = () => useContext(ThemeContext);
