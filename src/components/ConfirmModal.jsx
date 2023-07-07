import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function ConfirmModal(props) {
	const { content, buttonYes, buttonNo, handleClick, isOpened } = props;

	function handleModalClick(argument) {
		if (handleClick) {
			handleClick(argument);
		}
	}

	return (
		<>
			<Modal
				show={isOpened}
				size='md'
				popup
				onClose={() => handleModalClick('cancel')}
			>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
						<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
							{content}
						</h3>
						<div className='flex justify-center gap-4'>
							<Button
								color='failure'
								onClick={() => handleModalClick('remove')}
							>
								{buttonYes}
							</Button>
							<Button
								color='gray'
								onClick={() => handleModalClick('cancel')}
							>
								{buttonNo}
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

ConfirmModal.propTypes = {
	isOpened: PropTypes.bool,
	handleClick: PropTypes.func,
	content: PropTypes.string,
	buttonYes: PropTypes.string,
	buttonNo: PropTypes.string,
};

ConfirmModal.defaultProps = {
	handleClick: null,
	buttonYes: 'Yes',
	buttonNo: 'No',
};

export default ConfirmModal;
