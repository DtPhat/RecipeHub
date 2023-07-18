import React, { Suspense, useEffect, useState } from 'react'
import FilteringIcon from '../../assets/FilteringIcon'
import SearchingIcon from '../../assets/SearchingIcon'
import ViewIcon from '../../assets/ViewIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import GalleryView from '../../components/view/GalleryView'
import ListView from '../../components/view/ListView'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import RecipeFilter from './RecipeFilter'
import { Pagination } from 'flowbite-react';
import Skeleton from '../../components/Skeleton'
import NoRecipes from '../../components/view/NoRecipes'
import RecipeNavigation from './RecipeNavigation'
import SearchBar from '../../components/SearchBar'
import dummyRecipes from '../../dummyRecipes'
export const initialFilter = {
  sortingBy: '',
  isAscending: true,
  tags: [],
  ingredients: [],
  isFavourite: null,
  title: ''
}
export const defaultTagList = ['breakfast', 'lunch', 'dinner', 'appetizer', 'dessert', 'drink', 'snack']

const Recipe = () => {
  const [filter, setFilter] = useState(initialFilter)
  const [recipes, setRecipes] = useState([])
  const [viewOption, setViewOption] = useState('list')
  const [showingFilter, setShowingFilter] = useState(true)
  const [keyword, setKeyword] = useState('')
  const privateAxios = usePrivateAxios()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecipes, setTotalRecipes] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(totalRecipes / pageSize) || 1
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const requestFilter = {
      tags: filter.tags,
      ingredients: filter.ingredients,
      favorite: filter.isFavourite,
      sortBy: filter.sortingBy,
      direction: filter.isAscending ? 'asc' : 'desc',
      title: filter.title,
      privacyStatus: null
    }
    privateAxios.post(`/api/v1/user/recipes/filter?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then((response) => { setRecipes(response.data) })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))

    privateAxios.post(`/api/v1/user/recipes/filter/total-item?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then((response) => { setTotalRecipes(response.data) })
      .catch((error) => console.log(error))
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
    <section>
      <div className='w-full flex justify-center'>
        <div className='max-w-8xl w-full flex space-x-4 rounded lg:px-4 py-4 justify-center'>
          <div className='border-gray-400 rounded max-w-6xl w-full justify-center space-y-4 bg-container py-4 px-8'>
            <div className='select-none flex gap-4 justify-between pb-2 border-b-2 border-accent text-accent'>
              <button className={`flex items-center rounded cursor-pointer p-2 hover:bg-gray ${isFiltering && !showingFilter ? 'underline underline-offset-2' : ''}`}
                onClick={() => setShowingFilter(preState => !preState)}>
                <FilteringIcon style='w-6 h-6' />
                <span className='text-xl px-1 font-semibold hidden sm:block'>Filter</span>
              </button>
              <div className='max-w-[32rem] flex flex-1'>
                <SearchBar keyword={keyword} setKeyword={setKeyword} handleEnter={searchByKeyword} />
              </div>
              {/* <div className='flex items-center border-2 border-accent rounded-xl relative bottom-1 left-4 px-2 flex-1 max-w-[32rem] cursor-pointer'>
              <label htmlFor='search'><SearchingIcon style='w-8 h-8 cursor-pointer' /></label>
              <input className='bg-transparent focus:outline-none rounded-full w-full text-lg p-2 text-black' placeholder='Search recipes' id='search' autoComplete='off'
                value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={searchByKeyword} />
              <button onClick={() => setKeyword('')}><XCircleIcon style='w-8 h-8 text-gray-500 hover:fill-gray-200' /></button>
            </div> */}
              <div className='wp-auto sm:w-44 flex justify-end items-center'>
                <button className='hover:bg-gray rounded cursor-pointer p-2 flex justify-center items-center'
                  onClick={() => setViewOption(viewOption === 'list' ? 'gallery' : 'list')}>
                  <span className='text-xl px-1 font-semibold hidden sm:block'>{viewOption === 'list' ? "List View" : "Gallery View"}</span>
                  <ViewIcon style='w-6 h-6' viewOption={viewOption} />
                </button>
              </div>
            </div>
            {showingFilter && <div>
              <RecipeFilter filter={filter} setFilter={setFilter} />
              <div className='flex w-32 space-x-1 rounded p-2 border-gray bg-gray hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer text-gray'
                onClick={() => setFilter(initialFilter)}>
                <XCircleIcon style='w-6 h-6' />
                <span className='font-semibold'>Clear filter</span>
              </div>
            </div>}
            {filter.title && <div className='flex rounded p-2 '>
              <p className='font-semibold text-2xl'>Search results for "<span className='text-accent'>{filter.title}</span>"</p>
            </div>}
            {
              loading ?
                <Skeleton />
                : <div className='min-h-[50vh]'>
                  {recipes?.length ?
                    <div className='py-2'>
                      {viewOption === 'list' && <ListView recipeData={recipes} setRecipeData={setRecipes} />}
                      {viewOption === 'gallery' && <GalleryView recipeData={recipes} setRecipeData={setRecipes} />}
                    </div>
                    : <NoRecipes />
                  }
                </div>
            }
            <div className='flex justify-end'>
              <Pagination
                currentPage={currentPage}
                onPageChange={(page) => { setCurrentPage(page) }}
                showIcons
                totalPages={totalPages}
              />
            </div>
          </div>
          <div className='hidden 2xl:block flex-1'>
            <RecipeNavigation />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recipe