import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/header/AdminHeader';
import ContentHeader from '../../components/header/ContentHeader';

function DashBoard() {
	const [recipeTotal, setRecipeTotal] = useState(0);
	const [userTotal, setUserTotal] = useState(0);
	const [feedbackTotal, setFeedbackTotal] = useState(0);

	useEffect(() => {
		setRecipeTotal(0);
		setUserTotal(0);
		setFeedbackTotal(0);
	}, []);

	return (
		<div className='admin-content '>
			<AdminHeader category='page' title='Dashboard' />
			<div className='flex flex-col sm:flex-row justify-center content-center flex-wrap' >
				<div className='admin-child-content'>
					<ContentHeader category='total of recipes' title={recipeTotal} />
				</div>
				<div className='admin-child-content'>
					<ContentHeader category='total of users' title={userTotal} />
				</div>
				<div className='admin-child-content'>
					<ContentHeader
						category='total of feedbacks'
						title={feedbackTotal}
					/>
				</div>
			</div>
		</div>
	);
}

export default DashBoard;
