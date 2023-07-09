import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashBoard from './DashBoard';
import RecipeMP from './RecipeManagementPage/RecipeMP';
import FeedbackPage from './FeedbackPage/FeedbackPage';
import UserMP from './UserManagementPage/UserMP';
import SideNav from '../../components/NavBar/SideNav';
import TopNav from '../../components/NavBar/TopNav';
import { useThemeContext } from '../../contexts/ThemeContext';
import RequireAuth from '../RequireAuth';
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';
import useAuth from '../../hooks/useAuth';
function AdminLayout() {
	const navigate = useNavigate()
	const { auth } = useAuth()
	useEffect(() => {
		if (!(auth?.user.role === "ADMIN")) {navigate('/')}
	}, []);
	const { activeMenu, isDarkMode } = useThemeContext();
	return (
		<main
			className={
				isDarkMode
					? 'dark relative flex bg-gray-800 overflow-hidden text-whitegray'
					: 'relative flex overflow-hidden'
			}
		>
			<div
				className={
					activeMenu
						? 'sidebar fixed h-screen w-72 bg-white dark:bg-gray-900'
						: 'sidebar w-0 '
				}
			>
				<SideNav />
			</div>
			<div
				className={
					activeMenu
						? ' min-h-screen w-full dark:bg-gray-800 md:ml-72'
						: 'min-h-screen w-full dark:bg-gray-800'
				}
			>
				<div className='static bg-main-bg dark:bg-main-dark-bg navbar w-full '>
					<TopNav />
				</div>
				<div>
					<Outlet />
				</div>
			</div>
		</main>
	);
}

export default AdminLayout;
