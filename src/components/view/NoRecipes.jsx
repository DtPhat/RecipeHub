import React from 'react'

const NoRecipes = () => {
  return (
    <div className='flex flex-col p-2 items-center'>
      <div className='self-start'>
        <h1 className='px-2 text-3xl font-semibold text-green-variant dark:text-green-dark'>No recipes founded</h1>
        <span className='text-xl text-accent'></span>
      </div>
      <img src="/img/page-not-found.svg" className='w-[54rem]' alt="Not found" />
    </div>
  )
}

export default NoRecipes