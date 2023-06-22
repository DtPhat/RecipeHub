import React, { useEffect, useState } from 'react';
import ListView from '../view/ListView';
import dummyRecipes from '../../dummyRecipes';
import Pagination from '../DataTable/Pagination';

function List() {
	const recipeData = dummyRecipes;

	const [pagination, setPagination] = useState({
		page: 1,
		itemLimit: 2,
		totalRows: 6,
	});

	const [pageItems, setPageItems] = useState([]);

	function handlePageChange(newPage) {
		setPagination({
			...pagination,
			page: newPage,
		});
	}
	useEffect(() => {
		async function sliceArray() {
			try {
				let i = (pagination.page - 1) * pagination.itemLimit;
				const chunk = recipeData.slice(i, i + pagination.itemLimit);
				setPageItems(chunk);
			} catch (error) {
				console.log(error.message);
			}
		}
		sliceArray();
	}, [pagination]);

	return (
		<>
			<ListView recipeData={pageItems} />
			<Pagination onPageChange={handlePageChange} pagination={pagination} />
		</>
	);
}

export default List;
