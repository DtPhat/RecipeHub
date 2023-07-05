import React, { useEffect, useRef, useState } from 'react'
import SearchingIcon from '../../assets/SearchingIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import Skeleton from '../../components/Skeleton'
import useOuterClick from '../../hooks/useOuterClick'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import GlobalRecipeFilter from './GlobalRecipeFilter'
import GlobalView from './GlobalView'

const GlobalRecipes = () => {
  const privateAxios = usePrivateAxios()
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState({ sortingBy: '', isAscending: true, tags: [], ingredients: [], isFavourite: false, title: '' })
  const [loading, setLoading] = useState(true)
  const [globalRecipes, setGlobalRecipes] = useState([])
  const globalSearchRef = useRef()
  const { ref, open, setOpen } = useOuterClick(false)
  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setFilter(preFilter => { return { ...preFilter, title: keyword } })
      setKeyword('')
    }
  }
  useEffect(() => {
    globalSearchRef.current.focus()
  }, []);

  useEffect(() => {
    privateAxios.post(`/api/v1/global/recipes/filter?page=${0}&size=${10}`, {
      tags: filter.tags,
      ingredients: [],
      favorite: '',
      sortBy: '',
      direction: 'asc',
      title: filter.title,
      privacyStatus: 'PUBLIC'
    })
      .then(response => setGlobalRecipes(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [filter]);


  return (
    <section className='flex justify-center py-4 mx-8 gap-6'>
      <div className='border-gray-400 rounded max-w-8xl w-full space-y-4 bg-gray-50 py-4 px-8'>
        <div className='select-none flex justify-between pb-2 border-b-2 border-green-accent text-green-accent'>
          <h1 className='text-4xl font-semibold text-gray-600 w-1/2'>Explore our network of various recipes</h1>
          <div className='flex items-center w-1/2 border-2 border-green-accent rounded-xl relative bottom-1 left-4 px-2 mr-4 cursor-pointer'>
            <label htmlFor='search'><SearchingIcon style='w-8 h-8 cursor-pointer' /></label>
            <input className='bg-transparent focus:outline-none rounded-full w-full text-lg p-2 text-black'
              placeholder='Search global recipes' id='search' autoComplete='off' ref={globalSearchRef}
              value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={searchByKeyword} />
            <button onClick={() => setKeyword('')}><XCircleIcon style='w-8 h-8 text-gray-500 hover:fill-gray-200' /></button>
          </div>
        </div>
        <GlobalRecipeFilter filter={filter} setFilter={setFilter} />
        {filter.title && <div className='flex rounded p-2 '>
          <p className='font-semibold text-2xl'>Search results for "<span className='text-green-accent'>{filter.title}</span>"</p>
        </div>}
        {
          loading ?
            <Skeleton />
            : <GlobalView recipeData={globalRecipes} />
        }
      </div>
    </section>
  )
}
export default GlobalRecipes