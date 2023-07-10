import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import React from 'react'

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth()
  const location = useLocation()
  return (
    auth?.user?.role === allowedRole ? <Outlet />
      : auth ? <Navigate to='/' replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth