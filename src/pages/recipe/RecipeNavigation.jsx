import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AccessingIcon from '../../assets/AccessingIcon'
import ExportingIcon from '../../assets/ExportingIcon'
import FriendIcon from '../../assets/FriendIcon'
import PlusIcon from '../../assets/PlusIcon'
import Bars3Icon from '../../assets/Bars3Icon'
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { Link } from 'react-router-dom';
const RecipeNavigation = () => {
	const navigate = useNavigate();
	const privateAxios = usePrivateAxios()
	const [friendList, setFriendList] = useState([])
	useEffect(() => {
		privateAxios.get('/api/v1/user/friends').then(response => setFriendList(response.data))
	}, []);
	const options = [{
		Icon: <AccessingIcon style='w-8 h-8' />,
		text: 'Find other recipes',
		onClickFunction: function () { navigate('/global') }
	}, {
		Icon: <PlusIcon style='w-8 h-8' />,
		text: 'Add new recipe',
		onClickFunction: function () { navigate('./add') }
	}, {
		Icon: <ExportingIcon style='w-8 h-8' />,
		text: 'Export your recipes',
		onClickFunction: function () { navigate('./export') }
	}, {
		Icon: <FriendIcon style='w-8 h-8' />,
		text: `View friends' recipes`,
		onClickFunction: function () { navigate('./friends') }
	}]

	const optionsElement = options.map(sideOption => {
		const { Icon, text, onClickFunction } = sideOption
		return (
			<div className='flex space-x-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-5 border-b border-gray' onClick={onClickFunction} key={text}>
				{Icon}
				<span className={`text-xl font-semibold`}>{text}</span>
			</div>
		)
	})
	const friendListElement = friendList?.map(friend => (
		<Link to={`/user/${friend.userId}`} key={friend.userId} className='flex items-center space-x-4 cursor-pointer p-4 hover:bg-gray'>
			<img src={friend?.profileImage || "img/default-user.png"} alt="" className='w-9 h-9 rounded-full' />
			<span className={`text-lg font-medium truncate`}>{friend.fullName}</span>
		</Link>
	))
	return (
		<div className='flex flex-col rounded-md w-full bg-container pb-8'>
			<div className='bg-green-accent dark:bg-green-dark rounded-t px-3 w-full h-12 flex items-center'>
				<div className='rounded-full p-1'><Bars3Icon style='w-8 h-8 text-green-200' /></div>
			</div>
			<div className=''>{optionsElement}</div>
			<div>
			</div>
			<div className='mx-4 h-96 overflow-auto'>
				{friendListElement}
				{friendList.length > 1 && <div className='flex justify-end px-4'>
					<button className=' text-accent font-semibold hover:bg-gray px-2 rounded'
						onClick={() => navigate('./friends')}>VIEW ALL</button>
				</div>}

			</div>
		</div>
	)
}

export default RecipeNavigation