import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Spinner, Table } from 'flowbite-react';
import Pagination from '../../../components/DataTable/Pagination';
import axios, { axiosGetAdminRecipes } from '../../../api/axios';

import PageSizeSelector from '../../../components/DataTable/PageSizeSelector';
import SearchBar from '../../../components/DataTable/SearchBar';

const columns = [
	{
		key: 'name',
		name: 'Name',
	},
	{
		key: 'email',
		name: 'Email',
	},
	{
		key: 'age',
		name: 'Age',
	},
];

function UserDataTable() {
	const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [allSelected, setAllSelected] = useState(false);

	const [pagination, setPagination] = useState({
		page: 1,
		size: 2,
		totalItem: 4,
	});

	const [filter, setFilter] = useState({
		page: 1,
		size: 2,
		sort: 'user_id',
		direction: 'asc',
		query: '',
	});

	function handlePageChange(newPage) {
		setFilter({
			...filter,
			page: newPage,
		});
	}

	function handleSelectPageSize(event) {
		setFilter({
			...filter,
			size: event.target.value,
		});
	}

	function handleTableSearch(value) {
		setFilter({
			...filter,
			query: value,
		});
	}

	function handleTableSort(key) {
		if (key == filter.sort) {
			let newDirection;
			if (filter.direction == 'asc') {
				newDirection = 'desc';
			} else {
				newDirection = 'asc';
			}
			setFilter({
				...filter,
				page: 1,
				direction: newDirection,
			});
		} else {
			setFilter({
				...filter,
				page: 1,
				sort: key,
				direction: 'asc',
			});
		}
	}

	function handleSelectAll() {
		setAllSelected(!allSelected);
	}

	useEffect(() => {
		async function fetchRecipes() {
			setIsLoading(true);
			let data = await axiosGetAdminRecipes(filter);
			setIsLoading(false);
			setRows(data.data);
			setPagination({
				page: filter.page,
				size: filter.size,
				totalItem: data.totalItem,
			});
		}
		fetchRecipes();
	}, [filter]);

	return (
		<>
			<div className='flex justify-between max-h-12 mb-1'>
				<PageSizeSelector onPageSizeSelect={handleSelectPageSize} />
				<SearchBar onSearch={handleTableSearch} />
			</div>
			<Table hoverable>
				<Table.Head>
					{/* <Table.HeadCell className='!p-4'>
						<Checkbox onChange={handleSelectAll} />
					</Table.HeadCell> */}
					{columns.map((column, i) => (
						<Table.HeadCell
							key={i}
							onClick={() => handleTableSort(column.key)}
							className='cursor-pointer'
						>
							{column.name}{' '}
							<span>
								{column.key == filter.sort
									? filter.direction == 'asc'
										? '\u25B2'
										: '\u25BC'
									: '\u25BC'}
							</span>
						</Table.HeadCell>
					))}

					<Table.HeadCell>Action</Table.HeadCell>
				</Table.Head>
				<Table.Body className='divide-y'>
					{isLoading && (
						<Spinner size='xl' className='flex content-center' />
					)}
					{!isLoading &&
						rows.map((item, i) => (
							<Table.Row
								key={i}
								className='dark:border-gray-700 dark:bg-gray-800'
							>
								{/* <Table.Cell className='!p-4'>
									<Checkbox checked={allSelected} />
								</Table.Cell> */}
								<Table.Cell className='max-w-xs whitespace-nowrap content-center overflow-x-scroll no-scrollbar'>
									<img
										src={
											item.images.length > 0
												? item.images[0].imageUrl
												: ''
										}
										className='inline rounded-full aspect-square w-10 mr-4'
									/>
									<span>{item.full_name}</span>
								</Table.Cell>
								<Table.Cell className='max-w-xs flex flex-wrap'>
									{item.email}
								</Table.Cell>
								<Table.Cell>{item.birthday}</Table.Cell>
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

			<Pagination onPageChange={handlePageChange} pagination={pagination} />
		</>
	);
}

export default UserDataTable;
