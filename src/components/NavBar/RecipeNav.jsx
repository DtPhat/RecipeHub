import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AccessingIcon from '../../assets/AccessingIcon'
import ExportingIcon from '../../assets/ExportingIcon'
import FriendIcon from '../../assets/FriendIcon'
import PlusIcon from '../../assets/PlusIcon'
import Bars3Icon from '../../assets/Bars3Icon'
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { Link } from 'react-router-dom';
const RecipeNav = () => {
	const navigate = useNavigate();
	const privateAxios = usePrivateAxios()
	const [friendList, setFriendList] = useState([])
	useEffect(() => {
		privateAxios.get('/api/v1/user/friends').then(response => setFriendList(response.data))
	}, []);
	const options = [{
		Icon: <AccessingIcon style='w-8 h-8' />,
		keyword: 'Find',
		text: 'Find other recipes',
		onClickFunction: function () { navigate('/global') }
	}, {
		Icon: <PlusIcon style='w-8 h-8' />,
		text: 'Add new recipe',
		keyword: 'Add',
		onClickFunction: function () { navigate('/recipe/add') }
	}, {
		Icon: <ExportingIcon style='w-8 h-8' />,
		text: 'Export your recipes',
		keyword: 'Export',
		onClickFunction: function () { navigate('/recipe/export') }
	}, {
		Icon: <FriendIcon style='w-8 h-8' />,
		text: `View friends' recipes`,
		keyword: 'Friends',
		onClickFunction: function () { navigate('recipe/friends') }
	}]

	const optionsElement = options.map(sideOption => {
		const { Icon, text, keyword, onClickFunction } = sideOption
		return (
			<div className='flex sm:space-x-4 cursor-pointer text-green-200 hover:text-white py-2 bg-green-accent dark:bg-green-dark justify-center' onClick={onClickFunction} key={text}>
				<div className='hidden sm:block'>{Icon}</div>
				<span className={`text-lg font-semibold hidden lg:block`}>{text}</span>
				<span className={`text-lg font-semibold lg:hidden`}>{keyword}</span>
			</div>
		)
	})
	return (
		<div className='flex flex-col rounded w-full'>
			<div className='grid grid-cols-4 bg-green-accent text-white divide-x'>
				{optionsElement}
			</div>
		</div>
	)
}

export default RecipeNav