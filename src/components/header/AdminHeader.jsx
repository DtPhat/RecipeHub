import React from 'react';

function AdminHeader({ category, title }) {
	return (
		<div className=' mb-10'>
			<p className='text-lg text-gray-400'>{category}</p>
			<p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-whitegray'>
				{title}
			</p>
		</div>
	);
}

export default AdminHeader;
