import React from 'react';
import AdminHeader from '../../../components/header/AdminHeader';
import FeedbackDataTable from './FeedbackDataTable';

function FeedbackPage() {
	return (
		<div className='admin-content'>
			<AdminHeader category='page' title='Feedbacks' />
			<FeedbackDataTable />
		</div>
	);
}

export default FeedbackPage;
