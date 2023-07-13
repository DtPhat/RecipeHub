import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListView from '../../components/view/ListView'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { initialFilter } from '../recipe'
import dummyRecipes from '../../dummyRecipes'
import { getDayMonthYear, getStartOfDate } from '../../utils/DateUtils'
import SearchBar from '../../components/SearchBar'
import PlannerView from './PlannerView'
import Skeleton from '../../components/Skeleton'
import { Spinner } from 'flowbite-react'
const RecipeSelections = ({ chosenDate, setOpenRecipeSelections, setNewPlannedRecipe }) => {
  const [recipes, setRecipes] = useState([])
  const [keyword, setKeyword] = useState('')
  const privateAxios = usePrivateAxios()
  const [chosenMealType, setChosenMealType] = useState('BREAKFAST')
  const [chosenRecipe, setChosenRecipe] = useState()
  const [submitting, setSubmitting] = useState(false)
  console.log(chosenRecipe);
  const uploadMealPlanner = () => {
    if(!chosenRecipe) return 
    setSubmitting(true)
    privateAxios.post(`/api/v1/user/meal-planer`, {
      date: (new Date(chosenDate)).getTime(),
      recipeId: chosenRecipe.recipe_id,
      mealType: chosenMealType
    }).then(response => console.log(response))
      .catch(error => console.log(error))
      .finally(() => { setSubmitting(false); setOpenRecipeSelections(false); setNewPlannedRecipe(chosenRecipe.recipe_id)})
  }
  
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    privateAxios.post(`/api/v1/user/recipes/filter?page=${0}&size=${100}`, {
      tags: initialFilter.tags,
      ingredients: initialFilter.ingredients,
      favorite: initialFilter.isFavourite,
      sortBy: initialFilter.sortingBy,
      direction: initialFilter.isAscending ? 'asc' : 'desc',
      title: keyword,
      privacyStatus: null
    })
      .then((response) => { setRecipes(response.data) })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [keyword]);
  console.log(recipes);
  return (
    <section
      className='max-w-5xl w-full z-30 flex flex-col space-y-4 transition ease-in-out overflow-auto'>
      <h1 className='text-3xl font-bold'>Plan meal for {getDayMonthYear(chosenDate)}</h1>
      <div className='space-y-2'>
        <h1 className='text-xl pl-1 font-semibold '>Choose meal type:</h1>
        <div className='flex justify-between gap-4 flex-col sm:flex-row'>
          <button
            className={`${chosenMealType === 'BREAKFAST' ? 'button-contained-square opacity-90' : 'button-outlined-square font-bold'} text-xl`}
            onClick={() => { setChosenMealType('BREAKFAST') }}>Breakfast</button>
          <button
            className={`${chosenMealType === 'LUNCH' ? 'button-contained-square opacity-90' : 'button-outlined-square font-bold'} text-xl`}
            onClick={() => { setChosenMealType('LUNCH') }}>Lunch</button>
          <button
            className={`${chosenMealType === 'DINNER' ? 'button-contained-square opacity-90' : 'button-outlined-square font-bold'} text-xl`}
            onClick={() => { setChosenMealType('DINNER') }}>Dinner</button>
        </div>
      </div>
      <div className='space-y-4'>
        <h1 className='text-xl pl-1 font-semibold'>Choose a recipe: </h1>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
        {
          loading ?
            <Skeleton />
            : <div className='max-h-[29rem] overflow-auto'>
              <PlannerView recipeData={recipes} setChosenRecipe={setChosenRecipe} chosenRecipe={chosenRecipe} />
            </div>
        }
      </div>
      <div className='flex gap-4 justify-end pt-2 pr-4'>
        <button className='button-outlined color-secondary opacity-50 hover:opacity-100 w-32' onClick={() => { setOpenRecipeSelections(false) }}>Cancel</button>
        <button className={`button-contained w-32 ${!chosenRecipe ? 'bg-gray-500 border-gray-300' : ''}`} onClick={() => uploadMealPlanner()} disabled={submitting}>
          {submitting ?
            <Spinner color='success' />
            : <span>Plan</span>}
        </button>
      </div>
    </section >
  )
}

export default RecipeSelections