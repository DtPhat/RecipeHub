import React, { useState } from 'react'
import RecipeDetails from '../../components/RecipeDetails'
import dummyRecipes from '../../dummyRecipes'
import useOuterClick from '../../hooks/useOuterClick'
import { msToTime } from '../../utils/TimeUtil'
const PlannedMeals = ({ chosenDate }) => {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const date = DAYS[chosenDate.getDay()] + ' ' + chosenDate.getDate() + ' ' + MONTHS[chosenDate.getMonth()] + ' ' + chosenDate.getFullYear()
  const { ref, open, setOpen } = useOuterClick(false)
  const [chosenRecipe, setChosenRecipe] = useState()
  const [plannedrecipes, setPlannedRecipes] = useState()
  const recipesElement = dummyRecipes.map(item => {
    const { recipe_id, images, title, tags, rating, pre_time, cook_time, recipe_yield, ingredients, is_favourite, unit } = item
    const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
    return (
      <div key={recipe_id} className='flex border-2 border-green-variant p-2 rounded bg-gray-100 relative cursor-pointer'
        onClick={() => { setChosenRecipe(item); setOpen(true) }}>
        <img src={recipeImage} alt="" className='min-w-[8rem] h-32 object-fit rounded' />
        <div className='flex flex-col ml-4 overflow-hidden w-96'>
          <h1 className='text-lg font-bold text-green-variant'>Breakfast</h1>
          <h1 className='text-xl font-bold text-green-accent truncate'>{title}</h1>
          <div className='flex flex-col font-medium'>
            <div className='flex items-center space-x-2'><span className='text-gray-600'>Cook time:</span><span>{msToTime(cook_time)}</span></div>
            <div className='flex items-center space-x-2'><span className='text-gray-600'>Prep time:</span><span>{msToTime(pre_time)}</span></div>
            <div className='flex items-center space-x-2'><span className='text-gray-600'>Yield:</span><span>{recipe_yield}</span></div>
          </div>
        </div>
      </div>)
  })
  return (
    <div className='border-t-2 border-gray-400 min-h-[16rem] px-2 space-y-4 py-4 '>
      <h1 className='font-bold text-2xl'>{date}</h1>
      <div className='grid grid-cols lg:grid-cols-2 gap-4'>
        {recipesElement}
        {open && <RecipeDetails innerRef={ref} setOpen={setOpen} recipe={chosenRecipe} setRecipes={setPlannedRecipes}/>}
      </div>
    </div>
  )
}

export default PlannedMeals