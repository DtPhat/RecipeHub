import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'flowbite-react';
import Pagination from '../../../components/DataTable/Pagination';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import PageSizeSelector from '../../../components/DataTable/PageSizeSelector';
import SearchBar from '../../../components/DataTable/SearchBar';
import ConfirmModal from '../../../components/ConfirmModal';

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

	const [openModal, setOpenModal] = useState(false);

	const [selectedIndex, setSelectedIndex] = useState(-1);

	const [pagination, setPagination] = useState({
		page: 1,
		size: 5,
		totalItem: 5,
	});

	const [filter, setFilter] = useState({
		page: 1,
		size: 5,
		sort: 'userId',
		direction: 'asc',
		query: '',
	});

	const privateAxios = usePrivateAxios();

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

	function handleClick(argument, index) {
		if (argument === 'openConfirm') {
			setOpenModal(true);
			setSelectedIndex(index);
		} else {
			if (argument === 'yes') {
				if (selectedIndex > -1) {
					var id = rows[selectedIndex].recipe_id;
					rows.splice(selectedIndex, 1);
					privateAxios.delete(`/api/v1/admin/recipe/${id}`);
					setSelectedIndex(-1);
				}
				setOpenModal(false);
			} else {
				setOpenModal(false);
				setSelectedIndex(-1);
			}
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
	// &sort=${filter.sort}&direction=${filter.direction}&query=${filter.query}
	useEffect(() => {
		async function fetchUsers() {
			setIsLoading(true);
			let resp = await privateAxios.get(
				`/api/v1/admin/users?page=${filter.page - 1}&size=${filter.size}`,
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
		fetchUsers();
	}, [filter]);

	return (
		<>
			<div className='flex justify-between max-h-12 mb-1'>
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
						rows.map((item, i) => (
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
								<Table.Cell>{item.birthday}</Table.Cell>
								<Table.Cell>
									{item.blocked ? (
										<Button
											color='failure'
											size='sm'
											outline
											onClick={handleClick('unblock')}
										>
											unblock
										</Button>
									) : (
										<Button
											color='failure'
											size='sm'
											outline
											onClick={handleClick('block')}
										>
											Block
										</Button>
									)}
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>

			<Pagination onPageChange={handlePageChange} pagination={pagination} />
			<ConfirmModal
				content='Are you sure?'
				isOpened={openModal}
				handleClick={handleClick}
			/>
		</>
	);
}

export default UserDataTable;
