import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/header/AdminHeader';
import ContentHeader from '../../components/header/ContentHeader';
import usePrivateAxios from '../../hooks/usePrivateAxios';

function DashBoard() {
	const [recipeTotal, setRecipeTotal] = useState(0);
	const [userTotal, setUserTotal] = useState(0);
	const [feedbackTotal, setFeedbackTotal] = useState(0);

	const privateAxios = usePrivateAxios();
	useEffect(() => {
		async function fetchTotal(){
			let userResp = await privateAxios.get(
				`/api/v1/admin/user/total`,
				{ headers: { 'Content-Type': 'application/json' } }
			);
			let recipeResp = await privateAxios.get(
				`/api/v1/admin/recipe/total`,
				{ headers: { 'Content-Type': 'application/json' } }
			);
			let feedbackResp = await privateAxios.get(
				`/api/v1/admin/support-ticket/total`,
				{ headers: { 'Content-Type': 'application/json' } }
			);
			setRecipeTotal(recipeResp.data);
			setUserTotal(userResp.data);
			setFeedbackTotal(feedbackResp.data);
		}
		fetchTotal()
		
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
