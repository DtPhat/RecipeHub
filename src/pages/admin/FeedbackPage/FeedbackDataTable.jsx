import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'flowbite-react';
import Pagination from '../../../components/DataTable/Pagination';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import PageSizeSelector from '../../../components/DataTable/PageSizeSelector';
import SearchBar from '../../../components/DataTable/SearchBar';
import ConfirmModal from '../../../components/ConfirmModal';

const columns = [
	{
		key: '',
		name: 'Feedback',
	},
	{
		key: 'author',
		name: 'Author',
	},
	{
		key: 'date',
		name: 'Date',
	},
];

function FeedbackDataTable() {
	const [rows, setRows] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [pagination, setPagination] = useState({
		page: 1,
		size: 5,
		totalItem: 5,
	});

	const [filter, setFilter] = useState({
		page: 1,
		size: 5,
		sort: 'recipe_id',
		direction: 'asc',
		query: '',
	});

	const privateAxios = usePrivateAxios();

	function handleClick(argument) {
		if (argument === 'confirmRead') {
			setOpenModal(true);
		} else {
			if (argument === 'remove') {
				setOpenModal(false);
			} else {
				setOpenModal(false);
			}
		}
	}

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

	useEffect(() => {
		async function fetchRecipes() {
			setIsLoading(true);
			let resp = await privateAxios.get(
				`api/v1/admin/recipes?page=${filter.page - 1}&size=${
					filter.size
				}&sort=${filter.sort}&direction=${filter.direction}&query=${
					filter.query
				}`,
				{ headers: { 'Content-Type': 'application/json' } }
			);
			setIsLoading(false);
			setRows(resp.data.recipes);
			setPagination({
				page: filter.page,
				size: filter.size,
				totalItem: resp.data.totalItem,
			});
		}
		fetchRecipes();
	}, [filter]);

	return (
		<>
			<div className='flex justify-between max-h-12 mb-1	'>
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
				{isLoading && <Spinner size='xl' className='flex content-center' />}
				<Table.Body className='divide-y'>
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
									<Button
										color='success'
										size='sm'
										outline
										onClick={() => handleClick('confirmRead')}
									>
										Read
									</Button>{' '}
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>

			<Pagination onPageChange={handlePageChange} pagination={pagination} />

			<ConfirmModal
				content='feedback content**'
				isOpened={openModal}
				handleClick={handleClick}
				buttonYes='Confirm read'
				buttonNo='Cancel'
			/>
		</>
	);
}

export default FeedbackDataTable;
