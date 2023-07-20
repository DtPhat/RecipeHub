import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import BookIcon from '../../assets/BookIcon'
import NetworkIcon from '../../assets/NetworkIcon'
import PlanningIcon from '../../assets/PlanningIcon'
import PlusIcon from '../../assets/PlusIcon'
import useAuth from '../../hooks/useAuth'
import Notification from '../Notification'
import ProfileDropdown from '../ProfileDropdown'
import RecipeNav from '../NavBar/RecipeNav'
import { Tooltip } from 'flowbite-react'
const UserHeader = () => {
  const { auth, setAuth, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <section className={`flex mb-18 ${location.pathname === '/recipe' ? 'mb-28 2xl:mb-18' : ''}`}>
      <div className='fixed flex top-0 border-b-2 border-gray-200 dark:border-gray-800 shadow-md w-full bg-container h-18 z-20 px-2 xl:px-8 justify-between'>
        <NavLink to='/' className='pt-1 hidden lg:block'>
          <img src="/img/logo-text-recipehub.png" alt="logo with text" className='h-16 ' />
        </NavLink>
        <NavLink to='/' className='pt-1 lg:hidden'>
          <img src="/img/logo-no-text.png" alt="logo with text" className='h-16 ' />
        </NavLink>

        <nav className='flex flex-1 md:px-4 justify-around xl:justify-center font-semibold lg:text-xl space-x-2 xl:space-x-8 2xl:space-x-16 divide-x-2 md:divide-x-0 my-2 text-green-900 dark:text-green-600 font-serif'>
          <NavLink to='/recipe' className={`flex w-full md:w-auto justify-center items-center`} >
            {({ isActive }) =>
              <div className={`flex justify-center items-center space-x-2 group `}>
                <BookIcon style={`w-8 h-8 ${isActive ? 'fill-green-200 dark:fill-green-dark' : 'group-hover:text-green-600 dark:group-hover:text-green-500'}`} />
                <span className={`${isActive ? 'text-accent' : 'group-hover:text-green-600 dark:group-hover:text-green-500'} hidden md:block`}>Recipe Organizer</span>
              </div>}
          </NavLink>
          <NavLink to='/mealplanner' className={`flex w-full md:w-auto justify-center items-center`} >
            {({ isActive }) =>
              <div className={`flex justify-center items-center space-x-2 group`}>
                <PlanningIcon style={`w-8 h-8 ${isActive ? 'fill-green-200 dark:fill-green-dark' : 'group-hover:text-green-600 dark:group-hover:text-green-500'}`} />
                <span className={`${isActive ? 'text-accent' : 'group-hover:text-green-600 dark:group-hover:text-green-500'} hidden md:block`}>Meal Planner</span>
              </div>}
          </NavLink>
          <NavLink to='/global' className={`flex w-full md:w-auto justify-center items-center`} >
            {({ isActive }) =>
              <div className={`flex justify-center items-center space-x-2 group`}>
                <NetworkIcon style={`w-8 h-8 ${isActive ? 'fill-green-200 dark:fill-green-dark' : 'group-hover:text-green-600 dark:group-hover:text-green-500'}`} />
                <span className={`${isActive ? 'text-accent' : 'group-hover:text-green-600 dark:group-hover:text-green-500'} hidden md:block`}>Cooking Network</span>
              </div>}
          </NavLink>
        </nav>

        {
          auth ?
            <div className='flex items-center xs:space-x-2 xs:pl-2 my-2 border-gray border-l-2'>
              <button className='hover:bg-gray p-1 rounded hidden xs:block'
                onClick={() => { navigate('/recipe/add') }}>
                <Tooltip content='Create new recipe'>
                  <PlusIcon style='w-8 h-8' />
                </Tooltip>
              </button>
              <Notification />
              <ProfileDropdown />
            </div>
            : <div className='flex gap-4 items-center justify-between pl-2 my-2 border-gray border-l-2 xl:border-none'>
              <button className='button-outlined hidden md:block' onClick={() => navigate('/register')}>Register</button>
              <button className='button-contained w-20 xs:w-36' onClick={() => navigate('/login')}>Login</button>
            </div>
        }
      </div >
      <div className={`${location.pathname === '/recipe' ? 'fixed w-full mt-18 z-10 2xl:hidden border-b-2 shadow-md border-gray-200 dark:border-gray-900' : 'hidden'}`}>
        <RecipeNav />
      </div>
    </section >
  )
}


export default UserHeader