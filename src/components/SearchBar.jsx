import React, { useEffect, useRef } from 'react'
import SearchingIcon from '../assets/SearchingIcon'
import XCircleIcon from '../assets/XCircleIcon'

const SearchBar = ({ keyword, setKeyword, handleEnter, placeholder, autoFocus }) => {
  const searchRef = useRef()
  autoFocus && useEffect(() => {
    searchRef.current.focus()
  }, [keyword]);
  return (
    <div className={`flex items-center border-2 border-accent relative bottom-1 px-2 flex-1 w-full cursor-pointer ${handleEnter ? 'rounded-xl' : 'rounded-t-xl'} `}>
      <label htmlFor='search'><SearchingIcon style='w-8 h-8 cursor-pointer' /></label>
      <input className='bg-transparent focus:outline-none rounded-full w-full text-lg p-2 text-black dark:text-white' placeholder={placeholder || 'Search recipes'} id='search' autoComplete='off'
        value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleEnter} ref={searchRef}/>
      <button onClick={() => setKeyword('')}><XCircleIcon style='w-8 h-8 text-gray-500 dark:hover:fill-gray-800 hover:fill-gray-200' /></button>
    </div>
  )
}

export default SearchBar