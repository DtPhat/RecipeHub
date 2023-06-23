import React, { useEffect, useState } from 'react'
import msConverter from '../../utils/msConverter'
import ClockIcon from '../../assets/ClockIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import LeafIcon from '../../assets/LeafIcon'
import StarIcon from '../../assets/StarIcon'
import ViewIcon from '../../assets/ViewIcon'
import FilteringIcon from '../../assets/FilteringIcon'
import HeartIcon from '../../assets/HeartIcon'
import SearchingIcon from '../../assets/SearchingIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import SideOptions from './SideOptions'
import RecipeFilter from './RecipeFilter'
import dummyRecipes from '../../dummyRecipes'
import { Button } from 'flowbite-react'
import ListView from '../../components/view/ListView'
import GalleryView from '../../components/view/GalleryView'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
const Recipe = () => {
  const [data, setData] = useState()
  const {auth} = useAuth()
  useEffect(() => {
 
  }, []);

  const [viewOption, setViewOption] = useState('list')
  const [showedFilter, setShowedFilter] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [filter, setFilter] = useState({ sortingBy: '', isAscending: true, tags: [], ingredients: [], isFavourite: false })
  const isFiltering = filter.sortingBy || filter.tags.length || filter.ingredients.length || filter.isFavourite
  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setSearchResult(keyword)
    }
  }

  const recipeListElement = dummyRecipes.map(item => {
    const { imgUrl, title, tags, rating, prepTime, cookTime, recipeYield, ingredients, isFavourite } = item
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? true : false)
    }
    return (
      <div className='flex items-center border-2 border-gray-300 rounded p-1 bg-gray-100 hover:border-green-accent cursor-pointer relative'>
        <img src={imgUrl} alt="" className='w-32 h-32 rounded' />
        <div className='flex flex-col ml-4 space-y-2'>
          <h1 className='text-xl font-bold text-green-accent'>{title}</h1>
          <div className='space-x-2'>
            <div className='flex space-x-1'>
              {stars.map((star, i) => {
                return <StarIcon key={i} style={`w-4 h-4 stroke-transparent ${star ? 'fill-orange-accent' : 'fill-gray-300 outline-none'}`} />
              })}
            </div>
          </div>
          <div className='flex items-center space-x-4 font-medium'>
            <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span>{msConverter(300000)}</span></div>
            <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span>{ingredients.length}</span><span>Ingredients</span></div>
            <div className='flex items-center space-x-1'><KnifeForkIcon style='w-5 h-5' /><span>Yield: </span><span>{recipeYield}</span></div>
          </div>
          <div className='gap-2 py-1 flex flex-wrap'>
            {tags.map((tag) => {
              return (
                <span key={tag} className='border rounded-full py-0.5 px-3 border-green-variant'>
                  {tag}
                </span>)
            })}
          </div>
        </div>
        {isFavourite && <HeartIcon style='w-6 h-6 absolute fill-red-500 stroke-red-100 left-3 top-3' />}
      </div>
    )
  })


  return (
    <section className='flex justify-center mx-8 gap-6'>
      <div className='max-w-8xl w-full flex space-x-4 rounded py-4'>
        <div className='border-gray-400 rounded max-w-7xl w-full space-y-4 bg-gray-50 py-4 px-8'>
          <div className='select-none flex justify-between pb-2 border-b-2 border-green-accent text-green-accent'>
            <div className={`flex items-center rounded cursor-pointer p-2 hover:bg-gray-200 ${isFiltering && !showedFilter ? 'underline underline-offset-2' : ''}`}
              onClick={() => setShowedFilter(preState => !preState)}>
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
          {showedFilter && <RecipeFilter filter={filter} setFilter={setFilter} />}
          {searchResult && <div className='flex rounded p-2 '>
            <p className='font-semibold text-2xl'>Search results for "<span className='text-green-accent'>{searchResult}</span>"</p>
          </div>}
          <div className='py-2'>
            {viewOption === 'list' && <ListView recipeData={dummyRecipes} />}
            {viewOption === 'gallery' && <GalleryView recipeData={dummyRecipes} />}
          </div>
        </div>
        <div>
          <SideOptions />
        </div>
      </div>
    </section>
  )
}
export default Recipe