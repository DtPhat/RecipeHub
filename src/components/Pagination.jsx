import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';

Pagination.propTypes = {
	pagination: PropTypes.object.isRequired,
	onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
	onPageChange: null,
};

function Pagination(props) {
	const { pagination, onPageChange, onSizePick } = props;
	const { page, size, totalRows } = pagination;
	const totalPages = Math.ceil(totalRows / size);

	function handlePageChange(newPage) {
		if (onPageChange) {
			onPageChange(newPage);
		}
	}

	function handleSelectPageSize(newSize) {
		if (onSizePick) {
			onSizePick(newSize);
		}
	}

	return (
		<div className='text-gray-900 dark:text-gray-300 flex justify-between content-center w-full '>
			<Button.Group>
				<Button
					disabled={page <= 1}
					onClick={() => handlePageChange(page - 1)}
					color='gray'
				>
					Prev
				</Button>
				<Button
					disabled={page >= totalPages}
					onClick={() => handlePageChange(page + 1)}
					color='gray'
				>
					Next
				</Button>
			</Button.Group>
			<div className='flex'>
				<p className='text-center'>
					Showing{' '}
					{page * size >= totalRows ? `${totalRows}` : `${page * size}`} of{' '}
					{totalRows} of entries
				</p>
			</div>
		</div>
	);
}

export default Pagination;
