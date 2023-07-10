import React from 'react';

const ContentHeader = ({ category, title }) => {
	return (
		<div className=' mb-1'>
			<p className='text-sm text-gray-600 dark:text-gray-400'>{category}</p>
			<p className='text-xl font-extrabold tracking-tight text-slate-900 dark:text-whitegray'>
				{title}
			</p>
		</div>
	);
};

export default ContentHeader;