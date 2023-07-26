import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Spinner, Table } from 'flowbite-react';
import Pagination from '../../../components/DataTable/Pagination';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import PageSizeSelector from '../../../components/DataTable/PageSizeSelector';
import SearchBar from '../../../components/DataTable/SearchBar';
import ConfirmModal from '../../../components/ConfirmModal';
import AdminRecipeDetailModal from './AdminRecipeDetail';
import TypeSelector from '../../../components/DataTable/TypeSelector';

const columns = [
	{
		key: 'title',
		name: 'Title',
	},
	{
		key: '',
		name: 'Tags',
	},
	{
		key: 'rating',
		name: 'Rating',
	},
];

const typeOptions = [
	{ value: '', html: 'All' },
	{ value: true, html: 'Verified' },
	{ value: false, html: 'Not verified' },
];

function RecipeDataTable() {
	const [rows, setRows] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const [actionableRow, setActionableRow] = useState(null);

	const [pagination, setPagination] = useState({
		page: 1,
		size: 10,
		totalItem: 4,
	});

	const [filter, setFilter] = useState({
		page: 1,
		size: 10,
		sort: 'recipe_id',
		direction: 'asc',
		query: '',
		verified: '',
	});

	const privateAxios = usePrivateAxios();

	function resetRowModalSelect() {
		setOpenModal(false);
		setSelectedRow(null);
		setActionableRow(null);
		setModalType(null);
	}

	function handleConfirm(argument) {
		if (argument === 'yes') {
			if (actionableRow) {
				if (modalType === 'verify') {
					var id = actionableRow.recipe_id;
					let currentVerifyStatus = actionableRow.verified;
					let index = rows.findIndex((row) => row.recipe_id === id);
					let updatedRecipe = {
						...rows[index],
						verified: !currentVerifyStatus,
					};
					let updatedRows = [...rows];
					updatedRows[index] = updatedRecipe;
					setRows(updatedRows);
					privateAxios.post(`/api/v1/admin/recipe/` + id + '/verify');
				}
				if (modalType === 'remove') {
					var id = actionableRow.recipe_id;
					setRows((current) =>
						current.filter((row) => row.recipe_id !== id)
					);
					privateAxios.delete(`/api/v1/admin/recipe/${id}`);
				}
			}
			resetRowModalSelect();
		} else {
			setOpenModal(false);
			setModalType(null);
		}
	}

	function handleClick(argument, item) {
		if (argument === 'verify' || argument === 'remove') {
			setActionableRow(item);
			setOpenModal(true);
			setModalType(argument);
		}
	}

	function handlePageChange(newPage) {
		setFilter({
			...filter,
			page: newPage,
		});
	}

	function handleSelectType(event) {
		let value = event.target.value;
		if (value === 'false') {
			setFilter({
				...filter,
				verified: false,
			});
		} else if (value === 'true') {
			setFilter({
				...filter,
				verified: true,
			});
		} else {
			setFilter({
				...filter,
				verified: '',
			});
		}
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
				`/api/v1/admin/recipes?page=${filter.page - 1}&size=${
					filter.size
				}&sort=${filter.sort}&direction=${filter.direction}&query=${
					filter.query
				}&verified=${filter.verified}`,
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
				<TypeSelector
					label='Recipe verify status: '
					options={typeOptions}
					onTypeSelect={handleSelectType}
				/>
			</div>
			<div className='flex justify-between max-h-12	'>
				<PageSizeSelector onPageSizeSelect={handleSelectPageSize} />
				<SearchBar onSearch={handleTableSearch} />
			</div>
			<Table hoverable>
				<Table.Head>
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
						rows.map((item, i) => {
							if (filter.verified === item.verified || filter.verified === '')
								return (
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
											<Dropdown label='Action' placement='bottom'>
												<Dropdown.Item>
													<Button
														className='w-full'
														size='sm'
														outline
														onClick={() => setSelectedRow(item)}
													>
														View
													</Button>
												</Dropdown.Item>
												<Dropdown.Item>
													<Button
														className='w-full'
														color='success'
														size='sm'
														outline
														onClick={() =>
															handleClick('verify', item)
														}
													>
														Verify
													</Button>
												</Dropdown.Item>
												<Dropdown.Item>
													<Button
														className='w-full'
														color='failure'
														size='sm'
														outline
														onClick={() =>
															handleClick('remove', item)
														}
													>
														Remove
													</Button>
												</Dropdown.Item>
											</Dropdown>
										</Table.Cell>
									</Table.Row>
								);
						})}
				</Table.Body>
			</Table>

			<Pagination onPageChange={handlePageChange} pagination={pagination} />

			<AdminRecipeDetailModal
				chosenRecipe={selectedRow}
				onClose={resetRowModalSelect}
				action={handleClick}
			/>

			{modalType === 'verify' && (
				<ConfirmModal
					content='Do you want to verify this recipe?'
					isOpened={openModal}
					handleClick={handleConfirm}
				/>
			)}
			{modalType === 'remove' && (
				<ConfirmModal
					content='Do you want to remove this recipe?'
					isOpened={openModal}
					handleClick={handleConfirm}
				/>
			)}
		</>
	);
}

export default RecipeDataTable;
