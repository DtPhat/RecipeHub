import React, { useContext, useState, createContext, useEffect } from 'react';
import { Flowbite } from 'flowbite-react';
import { useMediaQuery } from 'react-responsive';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const isMediumScreen = useMediaQuery({ query: `(min-width: 760px)` });

	useEffect(() => {
		if (localStorage.getItem('theme') === 'dark') setIsDarkMode(true);
	}, []);

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
	const customTheme = {
		button: {
			color: {
				primary: 'border-2 bg-green-accent border-green-variant text-lg text-whitegray font-semibold rounded-full',
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
		</Flowbite>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
