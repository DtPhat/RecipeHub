import React from 'react'

const NoFriends = () => {
  return (
    <div className='flex flex-col p-2 items-center'>
      <div className='self-start'>
        <h1 className='px-2 text-3xl font-bold text-green-variant'>No friends found</h1>
        <span className='text-xl text-green-accent'></span>
      </div>
      <img src="/img/page-not-found.svg" className='w-[54rem]' alt="Not found" />
    </div>
  )
}

export default NoFriends