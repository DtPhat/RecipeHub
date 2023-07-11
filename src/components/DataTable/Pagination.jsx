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
	const { pagination, onPageChange } = props;
	const { page, size, totalItem } = pagination;
	const totalPages = Math.ceil(totalItem / size);

	function handlePageChange(newPage) {
		if (onPageChange) {
			onPageChange(newPage);
		}
	}

	return (
		<div className='text-gray-900 dark:text-gray-300 flex justify-between content-center w-full my-2 '>
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
					Showing {page * size + 1 - size} to{' '}
					{page * size >= totalItem ? `${totalItem}` : `${page * size}`} of{' '}
					{totalItem} of entries
				</p>
			</div>
		</div>
	);
}

export default Pagination;
