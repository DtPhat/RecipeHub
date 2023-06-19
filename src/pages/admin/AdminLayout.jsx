import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './DashBoard';
import RecipeMP from './RecipeManagementPage/RecipeMP';
import FeedbackPage from './FeedbackPage/FeedbackPage';
import UserMP from './UserManagementPage/UserMP';
import SideNav from '../../components/NavBar/SideNav';
import TopNav from '../../components/NavBar/TopNav';
import { useThemeContext } from '../../contexts/ThemeContext';
import RequireAuth from '../RequireAuth';

function AdminLayout() {
	const { activeMenu, isDarkMode } = useThemeContext();
	return (
		<main
			className={
				isDarkMode
					? 'dark relative flex bg-gray-700 overflow-hidden text-whitegray'
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
				<div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full '>
					<TopNav />
				</div>
				<div>
					<Routes>
						<Route path='/' element={<DashBoard />} />
						<Route element={<RequireAuth />}>
							<Route path='/RecipeManagement' element={<RecipeMP />} />
							<Route path='/Feedback' element={<FeedbackPage />} />
							<Route path='/UserManagement' element={<UserMP />} />
						</Route>
					</Routes>
				</div>
			</div>
		</main>
	);
}

export default AdminLayout;
