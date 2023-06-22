import React, { useState } from 'react';
import PropTypes from 'prop-types';

SearchBar.propTypes = {
	onSearch: PropTypes.func,
};

SearchBar.default = {
	onSearch: null,
};

function SearchBar(props) {
	const [searchValue, setSearchValue] = useState('');
	const { onSearch } = props;

	const handleInputChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleClick();
		}
	};

	function handleClick() {
		if (onSearch) {
			onSearch(searchValue);
		}
	}

	return (
		<div className='relative flex w-1/2 h-full flex-wrap items-stretch'>
			<input
				type='search'
				className='relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
				placeholder='Search'
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				value={searchValue}
			/>
			<button
				className='relative z-[2] rounded-r  border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0'
				type='button'
				data-te-ripple-init
				onClick={handleClick}
			>
				<span
					className='input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200'
					id='basic-addon2'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
						className='h-5 w-5'
					>
						<path
							fillRule='evenodd'
							d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
							clipPath='evenodd'
						/>
					</svg>
				</span>
			</button>
		</div>
	);
}

export default SearchBar;
