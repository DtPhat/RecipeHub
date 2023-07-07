import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLink({ to, children }) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	const activeLink =
		'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-black dark:text-white dark:bg-gray-700 text-md m-2 bg-gray-100 border-r-2 border-green-accent';
	const normalLink =
		'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:text-whitegray dark:hover:bg-slate-700 hover:bg-slate-100 m-2';

	return (
		<Link className={isActive ? activeLink : normalLink} to={to}>
			{' '}
			{children}{' '}
		</Link>
	);
}

export default CustomLink;
