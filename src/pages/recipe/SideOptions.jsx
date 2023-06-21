import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AccessingIcon from '../../assets/AccessingIcon'
import ExportingIcon from '../../assets/ExportingIcon'
import FriendIcon from '../../assets/FriendIcon'
import PlusIcon from '../../assets/PlusIcon'
import Bars3Icon from '../../assets/Bars3Icon'
import { Accordion } from 'flowbite-react';
const SideOptions = () => {
	const [collapsed, setCollapsed] = useState(false)
	const navigate = useNavigate();
	const sideOptions = [{
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
		onClickFunction: function () { navigate('./friend') }
	}]
	const friendList = [{
		name: 'Miles Morales'
	}, {
		name: 'Gwen Stacy'
	}, {
		name: 'Hobie Brown'
	}, {
		name: 'Peter Parker'
	}, {
		name: 'Migeal O Hara'
	}, {
		name: 'Character A'
	}, {
		name: 'Character B'
	}, {
		name: 'Character C'
	}]
	const sideOptionsElement = sideOptions.map(sideOption => {
		const { Icon, text, onClickFunction } = sideOption
		return (
			<div className='flex space-x-4 cursor-pointer hover:bg-gray-200 p-4' onClick={onClickFunction} key={text}>
				{Icon}
				<span className={`text-lg font-semibold`}>{text}</span>
			</div>
		)
	})
	const friendListElement = friendList.map(friend => (
		<div key={friend.name} className='flex items-center space-x-4 cursor-pointer p-4 hover:bg-gray-200'>
			<img src="img/default-user.png" alt="" className='w-8 h-8' />
			<span className={`text-lg font-medium truncate`}>{friend.name}</span>
		</div>
	))
	return (
		<div className='fixed flex flex-col rounded w-72 bg-gray-50 pb-8'>
			<div className='bg-green-accent rounded-t px-3 w-full h-12 flex items-center'>
				<button className='rounded-full hover:bg-green-700 p-1'><Bars3Icon style='w-8 h-8 text-green-100' /></button>
			</div>
			<div className='divide-y'>{sideOptionsElement}</div>
			<div>
			</div>
			<div className='mx-4 max-h-96 overflow-auto'>
				{friendListElement}
				<div className='flex justify-end px-4'>
					<button className=' text-green-accent font-semibold hover:bg-gray-200 px-2 rounded'
					onClick={()=>navigate('./friend')}>VIEW ALL</button>
				</div>
			</div>
		</div>
	)
}

export default SideOptions