import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { convertLongToDatetime } from '../../../utils/DateUtils';

function UserDetail({ chosenUser, onClose, action }) {
	const { isDarkMode } = useThemeContext();

	function handleBlock() {
		if (action) {
			action('block', chosenUser);
		}
	}

	function handleUnblock() {
		if (action) {
			action('unblock', chosenUser);
		}
	}

	return (
		<Modal
			dismissible
			show={chosenUser}
			onClose={onClose}
			size='xl'
			className={isDarkMode ? 'dark' : ''}
		>
			{chosenUser && (
				<>
					<Modal.Header>
						<span>User {chosenUser.fullName}'s Detail</span>
					</Modal.Header>
					<Modal.Body className='no-scrollbar'>
						<div className='flex gap-4 flex-row z-50 overflow-auto no-scrollbar dark:text-white'>
							<div className='w-2/5 h-auto aspect-square'>
								<img src={chosenUser.profileImage} />
							</div>
							<div className='w-3/5 h-auto'>
								<p>
									<span className='font-bold'>User ID: </span>
									<span>{chosenUser.userId}</span>
								</p>
								<p>
									<span className='font-bold'>Full name: </span>
									<span>{chosenUser.fullName}</span>
								</p>
								<p>
									<span className='font-bold'>Gender: </span>
									<span>{chosenUser.gender}</span>
								</p>
								<p>
									<span className='font-bold'>Birthday: </span>
									<span>
										{convertLongToDatetime(chosenUser.birthday)}
									</span>
								</p>
								<p>
									<span className='font-bold'>Status: </span>
									<span>
										{chosenUser.blocked ? (
											<span className='text-red-900 dark:text-red-300'>Blocked</span>
										) : (
											<span className='text-green-900 dark:text-green-300'>
												Not Blocked
											</span>
										)}
									</span>
								</p>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer className='flex-row-reverse gap-4 '>
						{chosenUser?.blocked ? (
							<div className='flex gap-1'>
								<Button
									color='success'
									size='sm'
									outline
									onClick={handleBlock}
								>
									Unblock
								</Button>
							</div>
						) : (
							<Button
								color='failure'
								size='sm'
								outline
								onClick={handleUnblock}
							>
								Block
							</Button>
						)}
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}

export default UserDetail;
