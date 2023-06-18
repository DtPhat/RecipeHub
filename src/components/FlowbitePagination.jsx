import React, { useState } from 'react';
import { Pagination } from 'flowbite-react';

function FlowbitePagination() {
	const [currPage, setCurrPage] = useState(1);
	const onPageChange = (page) => setCurrPage(page);

	return (
		<Pagination currentPage={currPage} onPageChange={() => onPageChange} />
	);
}

export default FlowbitePagination;
