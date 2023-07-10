import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='flex flex-col justify-center p-8'>
      <div>
        <h1 className='text-3xl font-bold text-green-variant py-4'>Page not found</h1>
        <span className='text-xl text-green-accent'>{' -> '}</span><Link to='/' className='link text-xl'>Return home</Link>
      </div>
      <img src="/img/page-not-found.svg" alt="" />
    </div>
  )
}

export default NotFound