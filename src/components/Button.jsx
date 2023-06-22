import React from 'react';

const Button = ({ customFunc, icon, disabled, children }) => {
	return (
		<>
			<button
				type='button'
				disabled={disabled}
				onClick={customFunc}
				className='relative rounded-full p-3 text-xl hover:bg-gray-300 dark:hover:bg-gray-600 aspect-square'
			>
				{icon} {children}
			</button>
		</>
	);
};

export default Button;
