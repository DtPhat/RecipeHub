import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import BookIcon from '../../assets/BookIcon'
import NetworkIcon from '../../assets/NetworkIcon'
import PlanningIcon from '../../assets/PlanningIcon'
import ShoppingIcon from '../../assets/ShoppingIcon'
const HomeHeader = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  return (
    <section className={` mb-18 flex`}>
      <div className='fixed flex top-0 border-b-2 shadow-md w-full bg-teal-50 h-18 z-20 px-8 justify-between'>
        <button onClick={() => navigate('/')}>
          <img src="/img/logo-text-recipehub.png" alt="logo with text" className='h-16' />
        </button>
        <nav className='flex font-semibold text-xl space-x-24 text-green-900 font-serif'>
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
          <NavLink to='/shoppinglist' className={`flex`} >
            {({ isActive }) =>
              <div className={`flex justify-center items-center space-x-2 group`}>
                <NetworkIcon style={`w-8 h-8 ${isActive ? 'fill-green-200' : 'group-hover:text-green-600'}`} />
                <span className={`${isActive ? 'text-green-accent' : 'group-hover:text-green-600'}`}>Cooking Network</span>
              </div>}
          </NavLink>
        </nav>
        {/* <NavLink className='flex'>
          <div className='flex items-center space-x-2 hover:bg-green-100 px-4 border-x-2'>
            <img src="/img/default-user.png" alt="" className='w-10 h-10 border rounded-full' />
            <span>Doan Tien Phat</span>
          </div>
        </NavLink> */}
        <div className='flex space-x-4 px-4 items-center'>
          <button className='button-secondary' onClick={()=>navigate('/register')}>Register</button>
          <button className='button-primary'  onClick={()=>navigate('/login')}>Login</button>
        </div>
      </div >
    </section >
  )
}

export default HomeHeader