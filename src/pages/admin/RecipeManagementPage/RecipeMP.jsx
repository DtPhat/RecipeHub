import React from 'react';
import List from '../../../components/List/List';
import RecipeDataTable from './RecipeDataTable';
import AdminHeader from '../../../components/header/AdminHeader';

function RecipeMP() {
	return (
		<div className='admin-content'>
			<AdminHeader category='page' title='Recipes' />
			<RecipeDataTable />
		</div>
	);
}

export default RecipeMP;
