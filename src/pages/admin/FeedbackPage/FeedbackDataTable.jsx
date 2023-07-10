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
	const [modalType, setModalType] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);

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

	function resetRowModalSelect() {
		setOpenModal(false);
		setSelectedIndex(-1);
		setModalType(null);
	}

	function handleConfirm(argument) {
		if (argument === 'yes') {
			if (selectedIndex > -1) {
				if (modalType === 'accept') {
					var id = rows[selectedIndex].userId;
					rows[selectedIndex].status = "ACCEPTED";
					privateAxios.post(`/api/v1/admin/support-ticket/accept/${id}`);
				}
				if(modalType === ' finish'){
					var id = rows[selectedIndex].userId;
					rows.splice(selectedIndex, 1);
					privateAxios.post(`/api/v1/admin/support-ticket/reject/${id}`);
				}
			}
			resetRowModalSelect();
		} else {
			resetRowModalSelect();
		}
	}

	function handleClick(argument, index) {
		if (argument === 'accept' || argument === 'finish') {
			setSelectedIndex(index);
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
	// &sort=${filter.sort}&direction=${filter.direction}&query=${filter.query}
	useEffect(() => {
		async function fetchFeedbacks() {
			setIsLoading(true);
			let resp = await privateAxios.get(
				`/api/v1/admin/support-tickets?page=${filter.page - 1}&size=${
					filter.size
				}`,
				{ headers: { 'Content-Type': 'application/json' } }
			);
			setIsLoading(false);
			setRows(resp.data.supportTickets);
			setPagination({
				page: filter.page,
				size: filter.size,
				totalItem: resp.data.totalItem,
			});
		}
		fetchFeedbacks();
	}, [filter]);

	return (
		<>
			<div className='flex justify-between max-h-12 mb-1	'>
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
									<span>{item.message}</span>
								</Table.Cell>
								<Table.Cell>{item.email}</Table.Cell>
								<Table.Cell>{item.status}</Table.Cell>
								<Table.Cell>
									{item?.status === 'PENDING' ? (
										<Button
											color='success'
											size='sm'
											outline
											onClick={() => handleClick('accept', i)}
										>
											Accept
										</Button>
									) : (
										<Button
											color='success'
											size='sm'
											outline
											onClick={() => handleClick('finish', i)}
										>
											Finish
										</Button>
									)}
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>

			<Pagination onPageChange={handlePageChange} pagination={pagination} />

			{modalType === 'accept' && (
				<ConfirmModal
					content='Do you want to accept this feedback?'
					isOpened={openModal}
					handleClick={handleConfirm}
				/>
			)}
			{modalType === 'finish' && (
				<ConfirmModal
					content='Do you want to finish this feedback?'
					isOpened={openModal}
					handleClick={handleConfirm}
				/>
			)}
		</>
	);
}

export default FeedbackDataTable;
