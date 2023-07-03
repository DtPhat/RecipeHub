import React, { Suspense, useEffect, useState } from 'react'
import FilteringIcon from '../../assets/FilteringIcon'
import SearchingIcon from '../../assets/SearchingIcon'
import ViewIcon from '../../assets/ViewIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import GalleryView from '../../components/view/GalleryView'
import ListView from '../../components/view/ListView'
import dummyRecipes from '../../dummyRecipes'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import RecipeFilter from './RecipeFilter'
import { Pagination } from 'flowbite-react';
import Skeleton from '../../components/Skeleton'
import NoRecipes from '../../components/view/NoRecipes'
import RecipeNavigation from './RecipeNavigation'

export const initialFilter = {
  sortingBy: '',
  isAscending: true,
  tags: [],
  ingredients: [],
  isFavourite: null,
  title: ''
}

const Recipe = () => {
  const [filter, setFilter] = useState(initialFilter)
  const [recipes, setRecipes] = useState()
  const [viewOption, setViewOption] = useState('list')
  const [showingFilter, setShowingFilter] = useState(false)
  const [keyword, setKeyword] = useState('')
  const privateAxios = usePrivateAxios()
  const [currentPage, setCurrentPage] = useState(1)

  const totalRecipes = recipes?.length || 1
  const pageSize = 10
  const totalPages = Math.ceil(totalRecipes / pageSize)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    privateAxios.post(`/api/v1/user/recipes/filter?page=${currentPage - 1}&size=${pageSize}`, {
      tags: filter.tags,
      ingredients: filter.ingredients,
      favorite: filter.isFavourite,
      sortBy: filter.sortingBy,
      direction: filter.isAscending ? 'asc' : 'desc',
      title: filter.title,
      privacyStatus: null
    })
      .then((response) => { setRecipes(response.data) })
      .catch((error) => console.log(error)).finally(() => setLoading(false))
  }, [filter, currentPage]);
  console.log(recipes);
  console.log(filter)
  
  const isFiltering = filter.sortingBy || filter.tags.length || filter.ingredients.length || filter.isFavourite

  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setFilter((preFilter) => { return { ...preFilter, title: keyword } })
    }
  }
  return (
    <section className='flex justify-center mx-8 gap-6'>
      {
        loading ?
          <Skeleton /> :
          <div className='max-w-8xl w-full flex space-x-4 rounded py-4'>
            <div className='border-gray-400 rounded max-w-7xl w-full space-y-4 bg-gray-50 py-4 px-8'>
              <div className='select-none flex justify-between pb-2 border-b-2 border-green-accent text-green-accent'>
                <div className={`flex items-center rounded cursor-pointer p-2 hover:bg-gray-200 ${isFiltering && !showingFilter ? 'underline underline-offset-2' : ''}`}
                  onClick={() => setShowingFilter(preState => !preState)}>
                  <FilteringIcon style='w-6 h-6' />
                  <span className='text-xl px-1 font-semibold'>Filter</span>
                </div>
                <div className='flex items-center border-2 border-green-accent rounded-xl relative bottom-1 left-4 px-2 flex-1 max-w-[32rem] cursor-pointer'>
                  <label htmlFor='search'><SearchingIcon style='w-8 h-8 cursor-pointer' /></label>
                  <input className='bg-transparent focus:outline-none rounded-full w-full text-lg p-2 text-black' placeholder='Search recipes' id='search' autoComplete='off'
                    value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={searchByKeyword} />
                  <button onClick={() => setKeyword('')}><XCircleIcon style='w-8 h-8 text-gray-500 hover:fill-gray-200' /></button>
                </div>
                <div className='hover:bg-gray-200 rounded cursor-pointer p-2 w-44 flex justify-center items-center'
                  onClick={() => setViewOption(viewOption === 'list' ? 'gallery' : 'list')}>
                  <span className='text-xl px-1 font-semibold'>{viewOption === 'list' ? "List View" : "Gallery View"}</span>
                  <ViewIcon style='w-6 h-6' viewOption={viewOption} />
                </div>
              </div>
              {showingFilter && <div>
                <RecipeFilter filter={filter} setFilter={setFilter} />
                <div className='flex w-32 space-x-1 rounded p-2 border-gray-200 bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-500'
                  onClick={() => setFilter(initialFilter)}>
                  <XCircleIcon style='w-6 h-6' />
                  <span className='font-semibold'>Clear filter</span>
                </div>
              </div>}
              {filter.title && <div className='flex rounded p-2 '>
                <p className='font-semibold text-2xl'>Search results for "<span className='text-green-accent'>{filter.title}</span>"</p>
              </div>}
              <div>
                {recipes?.length ? <div className='py-2'>
                  {viewOption === 'list' && <ListView recipeData={recipes} />}
                  {viewOption === 'gallery' && <GalleryView recipeData={dummyRecipes} />}
                </div>
                  : <NoRecipes />
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
            <div>
              <RecipeNavigation />
            </div>
          </div>
      }
    </section>
  )
}

export default Recipe