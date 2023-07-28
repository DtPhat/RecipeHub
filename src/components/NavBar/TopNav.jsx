import React from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';
import SwitchButton from '../SwitchButton';
import Button from '../Button';
import useAuth from '../../hooks/useAuth';
import { Avatar, Dropdown, Tooltip } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import BellIcon from '../../assets/BellIcon';

function TopNav() {
	const navigate = useNavigate();
	const { auth, logout } = useAuth();
	const { activeMenu, setActiveMenu, toggleDarkMode, isDarkMode } =
		useThemeContext();

	const handleToggleMenu = () => setActiveMenu(!activeMenu);

	const handleToggleNotification = () => {

	}

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
		<div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
			{/* toggleMenuButton */}
			<Tooltip content='Menu'>
				<Button
					customFunc={() => handleToggleMenu()}
					icon={menuToggleIcon}
				/>
			</Tooltip>


			<div className='flex'>
				{/* notification*/}
				<Tooltip content='Notification'>
					<Button icon={<BellIcon />} customFunc={handleToggleNotification}>

					</Button>
				</Tooltip>
				{/* toggleAvatarDropdownButton */}
				<Dropdown
					inline
					label={
						<Avatar rounded alt='avatar' img={auth.user.profileImage}>
							{`hello, ${auth.user.fullName}`}
						</Avatar>
					}
				>
					<Dropdown.Header>
						<span className='block text-sm'>{auth.user.fullName}</span>
						<span className='block truncate text-sm font-medium'>
							{auth.user.email}
						</span>
					</Dropdown.Header>

					<Dropdown.Item>
						<Tooltip content='Change theme'>
							<div onClick={(e) => e.stopPropagation()}>
								<SwitchButton
									isOn={isDarkMode}
									customFunc={toggleDarkMode}
								/>
							</div>
						</Tooltip>
					</Dropdown.Item>
					<Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
				</Dropdown>
			</div>
		</div >
	);
}

export default TopNav;
