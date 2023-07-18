import { Pagination } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import SearchingIcon from '../../assets/SearchingIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import SearchBar from '../../components/SearchBar'
import Skeleton from '../../components/Skeleton'
import useOuterClick from '../../hooks/useOuterClick'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import GlobalRecipeFilter from './GlobalRecipeFilter'
import GlobalView from './GlobalView'
import ReactGA from 'react-ga'

const GlobalRecipes = () => {
  const privateAxios = usePrivateAxios()
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState({ sortingBy: '', isAscending: true, tags: [], ingredients: [], isFavourite: false, title: '' })
  const [loading, setLoading] = useState(true)
  const [globalRecipes, setGlobalRecipes] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecipes, setTotalRecipes] = useState(1)
  const pageSize = 12
  const totalPages = Math.ceil(totalRecipes / pageSize)

  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setFilter(preFilter => { return { ...preFilter, title: keyword } })
      setKeyword('')
    }
  }

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    setLoading(true)
    const requestFilter = {
      tags: filter.tags,
      ingredients: [],
      favorite: '',
      sortBy: '',
      direction: 'asc',
      title: filter.title,
      privacyStatus: 'PUBLIC'
    }
    privateAxios.post(`/api/v1/global/recipes/filter?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then(response => setGlobalRecipes(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))

    privateAxios.post(`/api/v1/global/recipes/filter/total-item?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then((response) => { setTotalRecipes(response.data) })
      .catch((error) => console.log(error))

  }, [filter, currentPage]);


  return (
    <section className='flex justify-center py-4 lg:mx-8 gap-6'>
      <div className='border-gray-400 rounded max-w-8xl w-full space-y-4 bg-container py-4 px-8 '>
        <div className='select-none flex flex-col 2xl:flex-row gap-4 justify-between pb-2 border-b-2 border-accent text-accent'>
          <h1 className='text-2xl md:text-4xl font-semibold text-gray-500 '>Explore our network of various recipes</h1>
          <div className='w-full 2xl:w-1/2'>
            <SearchBar keyword={keyword} setKeyword={setKeyword} handleEnter={searchByKeyword} autoFocus={true} placeholder='Search our public recipes' />
          </div>
        </div>
        <GlobalRecipeFilter filter={filter} setFilter={setFilter} />
        {filter.title && <div className='flex rounded p-2 '>
          <p className='font-semibold text-2xl'>Search results for "<span className='text-accent'>{filter.title}</span>"</p>
        </div>}
        <div className='min-h-[70vh]'>
          {loading ?
            <Skeleton />
            : <GlobalView recipeData={globalRecipes} />
          }
        </div>
        <div className='flex justify-end'>
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => { setCurrentPage(page) }}
            showIcons
            totalPages={totalPages}
          />
        </div>
      </div>
    </section>
  )
}
export default GlobalRecipes