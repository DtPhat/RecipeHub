import React, { useEffect, useState } from 'react';
import dummyRecipes from '../../../dummyRecipes';
import DataTableBase from '../../../components/DataTable/DataTableBase';
import { Button, Checkbox, Spinner, Table } from 'flowbite-react';
import Pagination from '../../../components/Pagination';
import axios, { axiosGetAdminRecipes } from '../../../api/axios';

const columns = [
	{
		key: 'title',
		name: 'Title',
	},
	{
		key: 'tags',
		name: 'Tags',
	},
	{
		key: 'rating',
		name: 'Rating',
	},
];

function UserDataTable() {
	const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sortOrder, setSortOrder] = useState(true); // true = asc, false = desc
	const [sortKey, setSortKey] = useState('');
	const [allSelected, setAllSelected] = useState(false);

	const [pagination, setPagination] = useState({
		page: 1,
		size: 2,
		totalRows: 4,
	});

	function handlePageChange(newPage) {
		setPagination({
			...pagination,
			page: newPage,
		});
	}

	function handleSelectPageSize(event) {
		setPagination({
			...pagination,
			size: event.target.value,
		});
	}

	function handleTableSort(key) {
		if (key == sortKey) {
			setSortOrder(!sortOrder);
		} else {
			setSortKey(key);
			setSortOrder(true);
		}
	}

	function handleSelectAll() {
		setAllSelected(!allSelected);
	}

	useEffect(() => {
		async function fetchRecipes() {
			setIsLoading(true);
			let data = await axiosGetAdminRecipes(pagination);
			setIsLoading(false);
			setRows(data);
		}
		fetchRecipes();
	}, [pagination]);

	return (
		<>
			<div class='mb-2'>
				<label
					htmlFor='size'
					class='inline mb-2 text-sm font-medium text-gray-900 dark:text-white'
				>
					Showing
				</label>
				<select
					onChange={handleSelectPageSize}
					id='size'
					class=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='15'>15</option>
					<option value='20'>20</option>
				</select>
				<label
					for='size'
					class='inline mb-2 text-sm font-medium text-gray-900 dark:text-white'
				>
					records per page
				</label>
			</div>
			<Table hoverable>
				<Table.Head>
					<Table.HeadCell className='!p-4'>
						<Checkbox onChange={handleSelectAll} />
					</Table.HeadCell>
					{columns.map((column, i) => (
						<Table.HeadCell
							key={i}
							onClick={() => handleTableSort(column.key)}
							className='cursor-pointer'
						>
							{column.name}{' '}
							<span>
								{column.key == sortKey
									? sortOrder
										? '\u25BC'
										: '\u25B2'
									: '\u25B2'}
							</span>
						</Table.HeadCell>
					))}

					<Table.HeadCell>Action</Table.HeadCell>
				</Table.Head>
				<Table.Body className='divide-y'>
					{!isLoading &&
						rows.map((item, i) => (
							<Table.Row
								key={i}
								className='dark:border-gray-700 dark:bg-gray-800'
							>
								<Table.Cell className='!p-4'>
									<Checkbox checked={allSelected} />
								</Table.Cell>
								<Table.Cell className='max-w-xs whitespace-nowrap content-center overflow-x-scroll no-scrollbar'>
									<img
										src={
											item.images.length > 0
												? item.images[0].imageUrl
												: ''
										}
										className='inline rounded-full aspect-square w-10 mr-4'
									/>
									<span>{item.title}</span>
								</Table.Cell>
								<Table.Cell className='max-w-xs flex flex-wrap'>
									{item.tags.map((tag) => {
										return (
											<span
												key={tag.tagId}
												className='border rounded-full py-0.5 px-3 my-1 inline-block border-green-variant'
											>
												{tag.tagName}
											</span>
										);
									})}
								</Table.Cell>
								<Table.Cell>{item.rating}</Table.Cell>
								<Table.Cell>
									{' '}
									<Button color='failure' size='sm' outline>
										Remove
									</Button>{' '}
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>

			<Pagination
				onPageChange={handlePageChange}
				pagination={pagination}
				onSizePick={handleSelectPageSize}
			/>

			{isLoading && <Spinner size='xl' className='flex content-center' />}
		</>
	);
}

export default UserDataTable;
