import React from 'react';
import PropTypes from 'prop-types';

TypeSelector.propTypes = {
	onTypeSelect: PropTypes.func,
	options: PropTypes.array,
	label: PropTypes.string,
};

TypeSelector.defaultProps = {
	onTypeSelect: null,
	options: [
		{
			value: '5',
			html: '5',
		},
		{
			value: '10',
			html: '10',
		},
		{
			value: '15',
			html: '15',
		},
		{
			value: '20',
			html: '20',
		},
	],
};

function TypeSelector(props) {
	const { onTypeSelect, options, label } = props;

	function handleSelectType(event) {
		if (onTypeSelect) {
			onTypeSelect(event);
		}
	}

	return (
		<div className='mb-2'>
			<label
				htmlFor='size'
				className='inline mb-2 text-sm font-medium text-gray-900 dark:text-white'
			>
				{label}
			</label>
			<select
				onChange={handleSelectType}
				id='size'
				className=' bg-container border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
			>
				{options.map((option, i) => (
					<option key={i} value={option.value}>
						{option.html}
					</option>
				))}
			</select>
		</div>
	);
}

export default TypeSelector;
