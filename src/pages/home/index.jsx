import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Features from './Features';
import HomeFooter from './HomeFooter';
import ReactGA from 'react-ga';

const Home = () => {
	const navigate = useNavigate();
	const { auth } = useAuth();
	useEffect(() => {
		auth?.user.role == 'ADMIN' && navigate('/admin', { replace: true })
		auth?.user.role == 'USER' && navigate('/recipe', { replace: true });
		
		ReactGA.pageview(window.location.pathname + window.location.search)
	}, []);
	return (
		<section className='bg-gray-100'>
			<div className='text-green-50 bg-homepage h-[45rem] bg-cover bg-no-repeat flex flex-col items-center justify-center space-y-14'>
				<h1 className='text-5xl font-bold text-center px-1 sm:w-4/5'>
					Organize your favorite recipes online
				</h1>
				<span className='text-2xl font-semibold flex sm:w-2/5 px-4 text-center leading-relaxed'>
					Build your private cookbook by gathering recipes, making meal
					plan and creating shopping list for your meal.
				</span>
				<button
					className='text-xl font-bold px-16 py-2 bg-green-accent rounded text-green-100 border-2 border-green-variant hover:border-green-200 hover:text-whitegray'
					onClick={() => navigate('/recipe', { replace: true })}
				>
					Get it for free
				</button>
			</div>
			<Features />
			<HomeFooter />
		</section>
	);
};


export default Home;
