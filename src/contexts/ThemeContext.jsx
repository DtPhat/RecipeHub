import React, { useContext, useState, createContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

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
};

export const useThemeContext = () => useContext(ThemeContext);
