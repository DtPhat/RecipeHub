import React from 'react';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { Button, Modal } from 'flowbite-react';

function FeedbackDetail({ chosenFeedback, onClose, action }) {
	const { isDarkMode } = useThemeContext();

	function handleAccept() {
		if (action) {
			action('accept', chosenFeedback);
		}
	}

	function handleReject() {
		if (action) {
			action('finish', chosenFeedback);
		}
	}

	return (
		chosenFeedback && (
			<Modal
				dismissible
				show={chosenFeedback}
				onClose={onClose}
				size='xl'
				className={isDarkMode ? 'dark' : ''}
			>
				<Modal.Header>
					<span>Feedback from {chosenFeedback.email}</span>
				</Modal.Header>
				<Modal.Body className='no-scrollbar'>
					<div className='flex gap-4 flex-col z-50 overflow-auto no-scrollbar dark:text-white'>
                        <p>
                            <p className='font-bold'>
                                Message:
                            </p>
                            <span>
                                {chosenFeedback.message}
                            </span>
                        </p>
                    </div>
				</Modal.Body>
				<Modal.Footer className='flex-row-reverse gap-4 '>
					{chosenFeedback?.status === 'PENDING' ? (
						<div className='flex gap-1'>
							<Button
								color='success'
								size='sm'
								outline
								onClick={handleAccept}
							>
								Accept
							</Button>
							<Button
								color='failure'
								size='sm'
								outline
								onClick={handleReject}
							>
								Reject
							</Button>
						</div>
					) : (
						<Button
							color='success'
							size='sm'
							outline
							onClick={handleReject}
						>
							Finish
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		)
	);
}

export default FeedbackDetail;
