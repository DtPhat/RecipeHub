import { Spinner, Tooltip } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ShoppingIcon from '../../assets/ShoppingIcon'
import dummyRecipes from '../../dummyRecipes'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import RecipeModal from '../../components/RecipeModal'
import { msToTime } from '../../utils/TimeUtil'
import useAuth from '../../hooks/useAuth'
import ConfirmBox from '../../components/ConfirmBox'
import { splitIngredient } from '../../utils/StringUtils'

const PlannedMeals = ({ chosenDate, newPlannedRecipe, setRemovedPlannedRecipe, setShoppingListAmount }) => {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = DAYS[chosenDate.getDay()] + ' ' + chosenDate.getDate() + ' ' + MONTHS[chosenDate.getMonth()] + ' ' + chosenDate.getFullYear()
  const privateAxios = usePrivateAxios()
  const [chosenRecipe, setChosenRecipe] = useState()
  const [plannedMeals, setPlannedMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmRemovePlannedRecipe, setConfirmRemovePlannedRecipe] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { auth } = useAuth()
  useEffect(() => {
    setLoading(true)
    privateAxios.get(`/api/v1/user/meal-planers/${chosenDate.getTime()}`)
      .then(response => setPlannedMeals(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [chosenDate, newPlannedRecipe]);

  const removeFromPlanner = (id) => {
    setPlannedMeals(meals => meals.filter(meal => meal.mealPlannerId != id))
    privateAxios.delete(`/api/v1/user/meal-planer/${id}`).then(response => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => setRemovedPlannedRecipe(id))
  }
  const addToShoppingList = (addedRecipe) => {
    console.log(addedRecipe);
    setSubmitting(true)
    const list = JSON.parse(localStorage.getItem(`shoppinglist_${auth.user.userId}`)) || []
    if (list.length > 20) return
    let duplicated = false
    list.forEach(listedRecipe => {
      if (addedRecipe.recipe_id == listedRecipe.recipe_id) {
        duplicated = true
        addedRecipe.ingredients.forEach(ingredient => {
          listedRecipe.ingredients.forEach(item => {
            const { name, quantity, metric } = splitIngredient(ingredient)
            const storedQuantity = splitIngredient(item).quantity
            if (item.ingredientId == ingredient.ingredientId) {
              item.amount = quantity ? (quantity + storedQuantity + ' ' + metric) : ''
            }
          })
        })
        return
      }
    });
    !duplicated && list.push({ recipe_id: addedRecipe.recipe_id, title: addedRecipe.title, ingredients: addedRecipe.ingredients })
    setShoppingListAmount(list.length)
    console.log(list);
    localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(list))
    setTimeout(() => { setSubmitting(false) }, 1000)
  }
 
  const recipesElement = plannedMeals.map(meal => {
    const { recipe_id, images, title, tags, rating, pre_time, cook_time, recipe_yield, ingredients, is_favourite, unit, description, steps, nutrition, privacyStatus } = meal.recipe
    const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
    return (
      <div key={meal.mealPlannerId} className='flex border-2 border-green-variant p-2 rounded bg-item relative cursor-pointer group'
        onClick={() => !confirmRemovePlannedRecipe && setChosenRecipe(meal.recipe)}>
        <img src={recipeImage} alt="" className='w-32 h-32 rounded' />
        <div className='flex flex-col ml-4 overflow-hidden gap-2'>
          <h1 className='text-lg font-bold text-green-variant capitalize'>{meal.mealType}</h1>
          <h1 className='text-xl font-bold text-accent truncate'>{title}</h1>
          <div className='flex flex-col font-medium'>
            <div className='flex items-center space-x-2 flex-wrap'><span className='text-gray-500'>Cook time:</span><span>{msToTime(cook_time)}</span></div>
            <div className='flex items-center space-x-2 flex-wrap'><span className='text-gray-500'>Prep time:</span><span>{msToTime(pre_time)}</span></div>
          </div>
        </div>
        <div className='hidden group-hover:flex gap-2 absolute right-2 top-2'>
          <Tooltip content='Add recipe to shopping list' style='auto' className='relative'>
            <button className='button-outlined-square py-0 bg-gray' disabled={submitting}
              onClick={(e) => { e.stopPropagation(); addToShoppingList(meal.recipe) }}>
              <ShoppingIcon style='w-6 h-6' />
              {submitting ? <Spinner color='success' className='my-1' /> : <span>Add</span>}
            </button>
          </Tooltip>
          <button className='button-outlined-square py-0 bg-gray'
            onClick={(e) => {
              e.stopPropagation()
              // window.confirm('Are you sure to remove this recipe from planned list?') && removeFromPlanner(meal.mealPlannerId)
              setConfirmRemovePlannedRecipe(true)
            }}>
            <span>Remove</span>
          </button>
          <ConfirmBox open={confirmRemovePlannedRecipe} setOpen={setConfirmRemovePlannedRecipe} callback={() => removeFromPlanner(meal.mealPlannerId)} message={`Are you sure you want to remove this recipe from planner?`} />
        </div>
      </div>)
  })

  return (
    <div className='border-t-2 border-gray-400 min-h-[16rem] px-2 space-y-4 py-4 '>
      <h1 className='font-bold text-2xl'>{date}</h1>
      {
        loading ?
          <div role="status" className="p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between py-4">
              <div className='w-full'>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-7xl w-full mb-2.5"></div>
                <div className="max-w-6xl w-full h-2 bg-gray rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <div className='w-full'>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-7xl w-full mb-2.5"></div>
                <div className="max-w-6xl w-full h-2 bg-gray rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
          : <div className='grid grid-cols lg:grid-cols-2 gap-4'>
            {recipesElement}
            <RecipeModal chosenRecipe={chosenRecipe} setChosenRecipe={setChosenRecipe} />
          </div>
      }
    </div>
  )
}

export default PlannedMeals
