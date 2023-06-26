import React, { useEffect, useState } from 'react'
import { msToTime } from '../../utils/TimeUtil'
import ClockIcon from '../../assets/ClockIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import LeafIcon from '../../assets/LeafIcon'
import SearchingIcon from '../../assets/SearchingIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import GlobalRecipeFilter from './GlobalRecipeFilter'
import dummyRecipes from '../../dummyRecipes'
import PlusFriendIcon from '../../assets/PlusFriendIcon'
import { useRef } from 'react'
import useOuterClick from '../../hooks/useOuterClick'
import RecipeDetails from '../../components/RecipeDetails'

const GlobalRecipes = () => {
  const [keyword, setKeyword] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [filter, setFilter] = useState({ sortingBy: '', isAscending: true, tags: [], ingredients: [], isFavourite: false })
  const isFiltering = filter.sortingBy || filter.tags.length || filter.ingredients.length || filter.isFavourite
  const globalSearchRef = useRef()
  const { ref, open, setOpen } = useOuterClick(false)
  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setSearchResult(keyword)
    }
  }
  useEffect(() => {
    globalSearchRef.current.focus()
  }, []);
  const globalRecipeGalleryElement = dummyRecipes.map(item => {
    const {recipe_id, images, title, tags, rating, prepTime, cook_time, recipe_yield, unit, ingredients, isFavourite } = item
    return (
      <div key={recipe_id} className='w-full h-[32rem] flex flex-col rounded-lg bg-gray-100 border border-gray-200 hover:border-green-accent cursor-pointer relative' onClick={()=>setOpen(true)}>
        <img src={images[0].imageUrl} alt="" className='w-full h-60 object-cover rounded-t-lg' />
        <div className='bg-gray-200 flex items-center justify-between px-4'>
          <div className='flex items-center space-x-2 py-2'>
            <img src="https://yt3.googleusercontent.com/bFpwiiOB_NLCVsIcVQ9UcwBjb1RzipnMmtNfLSWpeIaHboyGkBCq4KBitmovRbStk9WvIWIZOyo=s900-c-k-c0x00ffffff-no-rj" alt="" className='w-10 h-10 rounded-full' />
            <span className={`text-lg font-medium truncate hover:underline underline-offset-2`}>Gordon Ramsay</span>
          </div>
          <button className='button-contained w-20 text-sm flex items-center'><PlusFriendIcon style='w-6 h-6' /><span>Add</span></button>
        </div>
        <div className='mx-4 py-2 space-y-4 overflow-auto'>
          <h1 className='text-xl font-bold text-green-accent truncate'>{title}</h1>
          <div className='space-x-1 font-semibold'>
            <span className='text-gray-600'>Difficulty:</span><span className=''>Hard</span>
          </div>
          <div className='flex flex-wrap gap-4 items-center font-medium'>
            <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span>{msToTime(cook_time)}</span></div>
            <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span>{ingredients.length}</span><span>Ingredients</span></div>
            <div className='flex items-center space-x-1'><KnifeForkIcon style='w-5 h-5' /><span>{recipe_yield} {unit}{recipe_yield > 1 ? 's' : ''}</span></div>
          </div>
          <div className='gap-2 flex flex-wrap'>
            {tags.map((tag) => {
              return (
                <span key={tag.tagId} className='border rounded-full py-0.5 px-3 border-green-variant'>
                  {tag.tagName}
                </span>)
            })}
          </div>
        </div>
        {open && <RecipeDetails recipe={item} innerRef={ref} setOpen={setOpen}/>}
      </div>)
  })

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
        {searchResult && <div className='flex rounded p-2 '>
          <p className='font-semibold text-2xl'>Search results for "<span className='text-green-accent'>{searchResult}</span>"</p>
        </div>}
        <div className='py-2 grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>{globalRecipeGalleryElement}</div>
      </div>
    </section>
  )
}
export default GlobalRecipes