import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import BookIcon from '../../assets/BookIcon'
import NetworkIcon from '../../assets/NetworkIcon'
import PlanningIcon from '../../assets/PlanningIcon'
import PlusIcon from '../../assets/PlusIcon'
import useAuth from '../../hooks/useAuth'
import Notification from '../Notification'
import ProfileDropdown from '../ProfileDropdown'
import Toast from '../Toast'

const UserHeader = () => {
  const { auth, setAuth, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <section className={` mb-18 flex`}>
      <div className='fixed flex top-0 border-b-2 shadow-md w-full bg-gray-50 h-18 z-20 px-8 justify-between'>
        <button onClick={() => navigate('/')}>
          <img src="/img/logo-text-recipehub.png" alt="logo with text" className='h-16' />
        </button>
        <nav className='flex font-semibold text-xl space-x-16 text-green-900 font-serif'>
          <NavLink to='/recipe' className={`flex`} >
            {({ isActive }) =>
              <div className={`flex justify-center items-center space-x-2 group `}>
                <BookIcon style={`w-8 h-8 ${isActive ? 'fill-green-200' : 'group-hover:text-green-600'}`} />
                <span className={`${isActive ? 'text-green-accent' : 'group-hover:text-green-600'}`}>Recipe Organizer</span>
              </div>}
          </NavLink>
          <NavLink to='/mealplanner' className={`flex`} >
            {({ isActive }) =>
              <div className={`flex justify-center items-center space-x-2 group`}>
                <PlanningIcon style={`w-8 h-8 ${isActive ? 'fill-green-200' : 'group-hover:text-green-600'}`} />
                <span className={`${isActive ? 'text-green-accent' : 'group-hover:text-green-600'}`}>Meal Planner</span>
              </div>}
          </NavLink>
          <NavLink to='/global' className={`flex`} >
            {({ isActive }) =>
              <div className={`flex justify-center items-center space-x-2 group`}>
                <NetworkIcon style={`w-8 h-8 ${isActive ? 'fill-green-200' : 'group-hover:text-green-600'}`} />
                <span className={`${isActive ? 'text-green-accent' : 'group-hover:text-green-600'}`}>Cooking Network</span>
              </div>}
          </NavLink>
        </nav>
        {
          auth ? <div className='flex items-center space-x-2 pl-2 my-2 border-l-2'>
            <button className='hover:bg-gray-200 p-1 rounded'
              onClick={() => { navigate('./recipe/add') }}>
              <PlusIcon style='w-8 h-8' />
            </button>
            <Notification />
            <ProfileDropdown />
          </div>
            :
            <div className='flex space-x-4 px-4 items-center'>
              <button className='button-outlined' onClick={() => navigate('/register')}>Register</button>
              <button className='button-contained' onClick={() => navigate('/login')}>Login</button>
            </div>
        }
      </div >
    </section >
  )
}


export default UserHeader