import { Avatar, Dropdown } from 'flowbite-react'
import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import BookIcon from '../../assets/BookIcon'
import NetworkIcon from '../../assets/NetworkIcon'
import PlanningIcon from '../../assets/PlanningIcon'
import useAuth from '../../hooks/useAuth'
import BellIcon from '../../assets/BellIcon'
import PlusIcon from '../../assets/PlusIcon'
import { googleLogout } from '@react-oauth/google';
import { emailToUsername } from '../../utils/StringUtils'

const HomeHeader = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('auth')
    setAuth(null)
    googleLogout();
    navigate('/login')
  }
  const username = auth && emailToUsername(auth.user.email);
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
              <PlusIcon style='w-7 h-7' />
            </button>
            <button className='hover:bg-gray-200 p-1 rounded'>
              <BellIcon style='w-7 h-7' />
            </button>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className='flex items-center space-x-2 p-2 hover:bg-gray-200 rounded'>
                  <Avatar img={auth.user.profileImage} rounded />
                  <span className='w-36 truncate text-lg font-medium font-serif'>
                    {auth.user.fullName}
                  </span>
                </div>
              } >
              <Dropdown.Header>
                <div className="text-sm font-medium flex flex-col space-y-1">
                  <span className='max-w-[12rem] truncate'>
                    {auth.user.fullName}
                  </span>
                  <span className='max-w-[12rem] truncate text-gray-500'>
                    {auth.user.email}
                  </span>
                </div>
              </Dropdown.Header>
              <Dropdown.Item >Dark mode</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => { navigate(`user/${username}`) }}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item>
                Settings
              </Dropdown.Item>
              <Dropdown.Item>
                Help
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>
                Log out
              </Dropdown.Item>
            </Dropdown>
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


export default HomeHeader