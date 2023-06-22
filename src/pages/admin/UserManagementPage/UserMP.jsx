import React from 'react';
import UserDataTable from './UserDataTable';
import AdminHeader from '../../../components/header/AdminHeader';

function UserMP() {
	return (
		<div className='admin-content'>
			<AdminHeader category='page' title='Users' />
			<UserDataTable />
		</div>
	);
}

export default UserMP;
