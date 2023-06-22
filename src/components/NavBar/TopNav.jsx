import React from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';
import SwitchButton from '../SwitchButton';
import Button from '../Button';
<<<<<<< HEAD
=======
import { Avatar, Dropdown, Tooltip } from 'flowbite-react';
>>>>>>> ae512bffff52947f38c15fd37509e62591f1cae8

function TopNav() {
	const { activeMenu, setActiveMenu, toggleDarkMode, isDarkMode } =
		useThemeContext();

	const handleToggleMenu = () => setActiveMenu(!activeMenu);

	const menuToggleIcon = (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='h-6 w-6'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
			/>
		</svg>
	);

	return (
<<<<<<< HEAD
		<div className='z-40 block fixed w-full md:static'>
			{/* toggleMenuButton */}
			<Button customFunc={() => handleToggleMenu()} icon={menuToggleIcon} />
			{/* toggleThemeButton */}
			<SwitchButton isOn={isDarkMode} customFunc={() => toggleDarkMode()} />
=======
		<div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
			{/* toggleMenuButton */}
			<Tooltip content='Menu'>
				<Button
					customFunc={() => handleToggleMenu()}
					icon={menuToggleIcon}
				/>
			</Tooltip>

			{/* toggleThemeButton */}
			<Dropdown
				inline
				label={
					<Avatar rounded alt='avatar' img='/img/admin-avatar.png'>
						hello, admin
					</Avatar>
				}
			>
				<Dropdown.Header>
					<span className='block text-sm'>Full name</span>
					<span className='block truncate text-sm font-medium'>
						email@email.com
					</span>
				</Dropdown.Header>
				<Dropdown.Item>Profile</Dropdown.Item>
				<Dropdown.Item>
					<Tooltip content='Change theme'>
						<SwitchButton
							isOn={isDarkMode}
							customFunc={() => toggleDarkMode()}
						/>
					</Tooltip>
				</Dropdown.Item>
				<Dropdown.Item>Sign out</Dropdown.Item>
			</Dropdown>
>>>>>>> ae512bffff52947f38c15fd37509e62591f1cae8
		</div>
	);
}

export default TopNav;
