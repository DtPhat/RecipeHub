import { Avatar, Dropdown } from 'flowbite-react'
import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { emailToUsername } from '../utils/StringUtils'

const ProfileDropdown = () => {
  const navigate = useNavigate()
  const { auth, logout } = useAuth()
  // const username = auth && emailToUsername(auth.user.email);
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <div className='flex items-center space-x-2 p-2 hover:bg-gray-200 rounded'>
          <Avatar img={auth.user.profileImage} rounded />
          <span className='w-36 truncate text-lg font-medium hidden xl:block'>
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
      <Dropdown.Item onClick={() => { navigate(`/user/profile`) }}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item onClick={() => { navigate('/user/settings') }}>
        Settings
      </Dropdown.Item>
      <Dropdown.Item onClick={() => { navigate(`/user/feedback`) }}>
        Feedback
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={logout}>
        Log out
      </Dropdown.Item>
    </Dropdown>
  )
}

export default ProfileDropdown