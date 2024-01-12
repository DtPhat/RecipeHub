import React, { useEffect, useRef } from 'react'
import SearchingIcon from '../assets/SearchingIcon'
import XCircleIcon from '../assets/XCircleIcon'

const SearchBar = ({ keyword, setKeyword, handleEnter, placeholder, autoFocus }) => {
  const searchRef = useRef(null)
  autoFocus && useEffect(() => {
    searchRef.current.focus()
  }, [keyword]);
  return (
    <div className={`flex items-center border-2 border-accent relative bottom-1 flex-1 w-full cursor-pointer ${handleEnter ? 'rounded-xl' : 'rounded-t-xl'} `}>
      <label htmlFor='search' className='absolute left-2'><SearchingIcon style='w-8 h-8 cursor-pointer' /></label>
      <input className='bg-transparent rounded-xl focus:outline-none focus:bg-gray w-full text-lg p-2 text-black dark:text-white px-12' placeholder={placeholder || 'Search recipes'} id='search' autoComplete='off'
        value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleEnter} ref={searchRef}/>
      <button onClick={() => setKeyword('')} className='absolute right-2'><XCircleIcon style='w-8 h-8 text-gray-500 dark:hover:fill-gray-800 hover:fill-gray-50' /></button>
    </div>
  )
}

export default SearchBar