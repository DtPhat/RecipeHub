import React from 'react'
import VerifyRecipeDataTable from './VerifyRecipeDataTable'
import AdminHeader from '../../../components/header/AdminHeader';

function VerifyRecipePage() {
  return (
    <div className='admin-content'>
			<AdminHeader category='page' title='Verify recipes' />
			<VerifyRecipeDataTable/>
		</div>
  )
}

export default VerifyRecipePage