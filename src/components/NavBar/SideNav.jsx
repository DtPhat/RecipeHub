import React, { useContext } from 'react';
import CustomLink from './CustomLink';
import { links } from './SideNavData';
import { useThemeContext } from '../../contexts/ThemeContext';
import { HiOutlineXCircle } from 'react-icons/hi';

function SideNav() {
	const { setActiveMenu } = useThemeContext();

	const handleTurnOffMenu = () => setActiveMenu(false);

	return (
		<div className=' h-screen overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto sidebar no-scrollbar'>
			<div className='mb-10 z-40 flex justify-between items-center'>
				<img
					className='h-auto md:w-2/3 w-1/2'
					src='img/logo-text-recipehub-v2.png'
					about='recipeHub'
				/>
				<button
					type='button'
					onClick={() => handleTurnOffMenu()}
					className='aspect-square relative rounded-full p-3 w-auto hover:bg-gray-300 dark:hover:bg-gray-600 md:hidden'
				>
					<HiOutlineXCircle />
				</button>
			</div>
			<div className='z-50 '>
				{links.map((link) => (
					<CustomLink to={link.path} key={link.id}>
						{' '}
						{link.icon} <span>{link.title}</span>
					</CustomLink>
				))}
			</div>

			{/* <CustomLink to='/RecipeManagement'>Manage Recipe</CustomLink>
      <CustomLink to='/Feedback'>Feedback</CustomLink>
      <CustomLink to='/UserManagement'>Manage User</CustomLink> */}
		</div>
	);
}

export default SideNav;
