import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Spinner, Table } from 'flowbite-react';
import Pagination from '../../../components/DataTable/Pagination';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import PageSizeSelector from '../../../components/DataTable/PageSizeSelector';
import SearchBar from '../../../components/DataTable/SearchBar';
import ConfirmModal from '../../../components/ConfirmModal';
import { convertLongToDatetime } from '../../../utils/DateUtils';
import TypeSelector from '../../../components/DataTable/TypeSelector';
import UserDetail from './UserDetail';

const columns = [
	{
		key: 'full_name',
		name: 'Name',
	},
	{
		key: 'email',
		name: 'Email',
	},
	{
		key: 'birthday',
		name: 'Birthday',
	},
];

const typeOptions = [
	{ value: '0', html: 'Not blocked' },
	{ value: '1', html: 'Blocked' },
];

function UserDataTable() {
	const [rows, setRows] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState(null);

	const [selectedRow, setSelectedRow] = useState(null);
	const [actionableRow, setActionableRow] = useState(null);

	const [pagination, setPagination] = useState({
		page: 1,
		size: 5,
		totalItem: 0,
	});

	const [filter, setFilter] = useState({
		page: 1,
		size: 5,
		sort: 'user_id',
		direction: 'asc',
		blocked: '0',
		query: '',
	});

	const privateAxios = usePrivateAxios();

	async function fetchUsers() {
		setIsLoading(true);
		let resp = await privateAxios.get(
			`/api/v1/admin/users?page=${filter.page - 1}&size=${
				filter.size
			}&sort=${filter.sort}&direction=${filter.direction}&query=${
				filter.query
			}${filter.blocked === '' ? '' : `&isBlocked=${filter.blocked ? 1 : 0}`}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		setIsLoading(false);
		setRows(resp.data.users);
		setPagination({
			page: filter.page,
			size: filter.size,
			totalItem: resp.data.totalItem,
		});
	}
	console.log(rows);
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

	function handleSelectType(event) {
		setFilter({
			...filter,
			blocked: event.target.value,
		});
	}

	function handleTableSearch(value) {
		setFilter({
			...filter,
			query: value,
		});
	}

	function resetRowModalSelect() {
		setOpenModal(false);
		setSelectedRow(null);
		setActionableRow(null);
		setModalType(null);
	}

	function handleClick(argument, item) {
		if (argument === 'block' || argument === 'unblock') {
			setActionableRow(item);
			setOpenModal(true);
			setModalType(argument);
		}
	}

	function handleConfirm(argument) {
		if (argument === 'yes') {
			if (actionableRow) {
				if (modalType === 'block') {
					setIsLoading(true);
					var id = actionableRow.userId;
					let index = rows.findIndex((row) => row.userId === id);
					let updatedUser = {
						...rows[index],
						blocked: true,
					};
					let updatedRows = [...rows];
					updatedRows[index] = updatedUser;
					setRows(updatedRows);
					privateAxios.post(`/api/v1/admin/user/block/${id}`);
					setIsLoading(false);
				}
				if (modalType === 'unblock') {
					setIsLoading(true);
					var id = actionableRow.userId;
					let index = rows.findIndex((row) => row.userId === id);
					let updatedUser = {
						...rows[index],
						blocked: false,
					};
					let updatedRows = [...rows];
					updatedRows[index] = updatedUser;
					setRows(updatedRows);
					privateAxios.post(`/api/v1/admin/user/unblock/${id}`);
					setIsLoading(false);
				}
			}
			resetRowModalSelect();
		} else {
			setOpenModal(false);
			setModalType(null);
			setActionableRow(null);
		}
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
		fetchUsers();
	}, [filter]);

	return (
		<>
			<div className='flex justify-between max-h-12 mb-1	'>
				<TypeSelector
					label='User status: '
					options={typeOptions}
					onTypeSelect={handleSelectType}
				/>
			</div>
			<div className='flex justify-between max-h-12'>
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
							if (
								filter.blocked === '0' && !item?.blocked ||filter.blocked === '1' && item?.blocked
							) {
								return (
									<Table.Row
										key={i}
										className='dark:border-gray-700 dark:bg-gray-800'
									>
										<Table.Cell className='max-w-xs whitespace-nowrap content-center overflow-x-scroll no-scrollbar'>
											<img
												src={item.profileImage}
												className='inline rounded-full aspect-square w-10 mr-4'
											/>
											<span>{item.fullName}</span>
										</Table.Cell>
										<Table.Cell className='max-w-xs flex flex-wrap'>
											{item.email}
										</Table.Cell>
										<Table.Cell>
											{convertLongToDatetime(item.birthday)}
										</Table.Cell>
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

												{item?.blocked ? (
													<Dropdown.Item>
														<Button
															className='w-full'
															color='success'
															size='sm'
															outline
															onClick={() =>
																handleClick('unblock', item)
															}
														>
															Unblock
														</Button>
													</Dropdown.Item>
												) : (
													<Dropdown.Item>
														<Button
															className='w-full'
															color='failure'
															size='sm'
															outline
															onClick={() =>
																handleClick('block', item)
															}
														>
															Block
														</Button>
													</Dropdown.Item>
												)}
											</Dropdown>
										</Table.Cell>
									</Table.Row>
								);
							}
						})}
				</Table.Body>
			</Table>

			<Pagination onPageChange={handlePageChange} pagination={pagination} />

			<UserDetail
				chosenUser={selectedRow}
				action={handleClick}
				onClose={resetRowModalSelect}
			/>

			{modalType === 'block' && (
				<ConfirmModal
					content='Do you want to block this account?'
					isOpened={openModal}
					handleClick={handleConfirm}
				/>
			)}
			{modalType === 'unblock' && (
				<ConfirmModal
					content='Do you want to un-block this account?'
					isOpened={openModal}
					handleClick={handleConfirm}
				/>
			)}
		</>
	);
}

export default UserDataTable;
