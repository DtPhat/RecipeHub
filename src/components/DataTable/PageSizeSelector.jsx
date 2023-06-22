import React from 'react';
import PropTypes from 'prop-types';

PageSizeSelector.propTypes = {
	onPageSizeSelect: PropTypes.func,
};

PageSizeSelector.defaultProps = {
	onPageSizeSelect: null,
};

function PageSizeSelector(props) {
	const { onPageSizeSelect } = props;

	function handleSelectPageSize(event) {
		if (onPageSizeSelect) {
			onPageSizeSelect(event);
		}
	}

	return (
		<div className='mb-2'>
			<label
				htmlFor='size'
				className='inline mb-2 text-sm font-medium text-gray-900 dark:text-white'
			>
				Showing
			</label>
			<select
				onChange={handleSelectPageSize}
				id='size'
				className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
			>
				<option value='5'>5</option>
				<option value='10'>10</option>
				<option value='15'>15</option>
				<option value='20'>20</option>
			</select>
			<label
				htmlFor='size'
				className='inline mb-2 text-sm font-medium text-gray-900 dark:text-white'
			>
				records per page
			</label>
		</div>
	);
}

export default PageSizeSelector;
