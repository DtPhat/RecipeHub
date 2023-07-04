import React from 'react'
import SearchingIcon from '../assets/SearchingIcon'
import XCircleIcon from '../assets/XCircleIcon'

const SearchBar = ({ keyword, setKeyword, handleEnter }) => {
  return (
    <div className='flex items-center border-2 border-green-accent rounded-xl relative bottom-1 px-2 flex-1 w-full cursor-pointer'>
      <label htmlFor='search'><SearchingIcon style='w-8 h-8 cursor-pointer' /></label>
      <input className='bg-transparent focus:outline-none rounded-full w-full text-lg p-2 text-black' placeholder='Search recipes' id='search' autoComplete='off'
        value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleEnter} />
      <button onClick={() => setKeyword('')}><XCircleIcon style='w-8 h-8 text-gray-500 hover:fill-gray-200' /></button>
    </div>
  )
}

export default SearchBar