import React, { useEffect, useState } from 'react'
import PlusCircleIcon from '../../assets/PlusCircleIcon'
import SortingIcon from '../../assets/SortingIcon'
import useAuth from '../../hooks/useAuth'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { defaultTagList } from './'
const RecipeFilter = ({ filter, setFilter }) => {
  const privateAxios = usePrivateAxios()
  const { auth: { user: { userId } } } = useAuth()
  const [tagList, setTagList ]= useState(defaultTagList) 
  const [ingredientInput, setIngredientInput] = useState('')
  const sortingOptions = ['title', 'recent', 'time', 'rating', 'yield']
  useEffect(() => {
    privateAxios.get(`/api/v1/global/tags/${userId}`).then(response => setTagList(prevList => [...prevList, ...response.data.map(tag => tag.tagName)]))
  }, []);

  const sortingOptionsElement = sortingOptions.map(sortingOption => (
    <button key={sortingOption} className={` px-2 rounded font-medium border-2
      ${sortingOption === filter.sortingBy ? 'border-green-accent bg-green-100 text-green-accent  ' : 'border-gray-400 text-gray-500 hover:border-green-accent'} `}
      onClick={() => setFilter(preFilter => { return { ...preFilter, sortingBy: sortingOption !== preFilter.sortingBy ? sortingOption : '' } })}>
      {sortingOption}
    </button>))

  const tagListElement = tagList.map(tag => (
    <button key={tag} className={`border px-2 rounded-full
      ${filter.tags.includes(tag) ? 'border-green-accent bg-green-200 text-green-accent' : 'border-gray-400 text-gray-600 hover:border-green-accent'}`}
      onClick={() => setFilter(preFilter => {
        const tagList = [...preFilter.tags]
        tagList.includes(tag) ? tagList.splice(tagList.indexOf(tag), 1) : tagList.push(tag)
        return { ...preFilter, tags: tagList }
      })}>
      {tag}
    </button>))

  const ingredientListElement = filter.ingredients.map(ingredient =>
    <button key={ingredient} className={`text-green-accent hover:line-through`}
      onClick={() => setFilter(preFilter => { return { ...preFilter, ingredients: preFilter.ingredients.filter(item => item !== ingredient) } })}>
      {ingredient}
    </button>)

  const addFilteringIngredient = () => {
    ingredientInput && setFilter(preFilter => {
      const newIngredients = [...preFilter.ingredients]
      newIngredients.push(ingredientInput)
      setIngredientInput('')
      return { ...preFilter, ingredients: newIngredients }
    })
  }
  return (
    <div className='py-4 space-y-4'>
      <div className='flex space-x-4 border-b border-gray-200 pb-2'>
        <h1 className='font-bold'>Sort by:</h1>
        <div className='flex flex-wrap gap-2'>{sortingOptionsElement}</div>
        <button className='hover:bg-gray-200 p-1 cursor-pointer rounded'
          onClick={() => setFilter(preFilter => { return { ...preFilter, isAscending: !preFilter.isAscending } })}>
          <SortingIcon style='w-6 h-6 text-green-accent' isAscending={filter.isAscending} />
        </button>
      </div>
      <div className='flex space-x-4 border-b border-gray-200 pb-2'>
        <h1 className='font-bold'>Tags:</h1>
        <div className='flex flex-wrap gap-2'>{tagListElement}</div>
      </div>
      <div className='flex space-x-2 border-b border-gray-200 pb-2'>
        <h1 className='font-bold'>Ingredients:</h1>
        <input type="text" className='bg-gray-50 px-0.5 focus:outline-none border-b border-green-accent text-center' value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addFilteringIngredient(e)} />
        <button onClick={addFilteringIngredient}>
          <PlusCircleIcon style='w-6 h-6 text-green-accent' />
        </button>
        <div className='flex flex-wrap gap-4'>{ingredientListElement}</div>
      </div>
      <div className='flex space-x-2 border-b border-gray-200 pb-2'>
        <h1 className='font-bold'>Favorite:</h1>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={filter.isFavourite} className="sr-only peer"
            onChange={() => setFilter(preFilter => { return { ...preFilter, isFavourite: !preFilter.isFavourite } })} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-variant"></div>
        </label>
      </div>
    </div>
  )
}

export default RecipeFilter