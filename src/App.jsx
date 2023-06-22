import React from 'react';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import UserLayout from './pages/UserLayout';
import RequireAuth from './pages/RequireAuth';
import { Route, Routes } from 'react-router-dom';
import HomeHeader from './components/header/HomeHeader';
import Home from './pages/home/index.jsx';
import Login from './pages/login/index.jsx';
import Register from './pages/register/index.jsx';
import Recipe from './pages/recipe/index.jsx';
import useAuth from './hooks/useAuth.js';
import GlobalRecipe from './pages/global/index.jsx';

const App = () => {
	const roles = {
		user: 0,
		admin: 1,
	};
	const {
		auth: { user, role },
	} = useAuth();

	return (
		<>
			{/* {!user ? (
				<main>
					<HomeHeader />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</main>
			) : role === roles.user ? (
				<UserLayout />
			) : (
				<AdminLayout />
			)} */}
			{
				<main>
					{/* <HomeHeader />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route element={<RequireAuth />}>
							<Route path='/*' element={<UserLayout />} />
							<Route path='/*' element={<AdminLayout />} />
						</Route>
						<Route path='/login' element={<Login />} />
						<Route path='/global' element={<GlobalRecipe />} />
						<Route path='/register' element={<Register />} />
					</Routes> */}
					<AdminLayout />
				</main>
			}
		</>
	);
};

export default App;
