import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { Link } from 'react-router-dom'
import ShoppingIcon from '../../assets/ShoppingIcon'
import useAuth from '../../hooks/useAuth'
import { getStartOfDate } from '../../utils/DateUtils'
import Calendar from './Calendar'
import PlannedMeals from './PlannedMeals'

const MealPlanner = () => {

  const [chosenDate, setChosenDate] = useState(getStartOfDate(new Date()))
  const [newPlannedRecipe, setNewPlannedRecipe] = useState()
  const [removedPlannedRecipe, setRemovedPlannedRecipe] = useState()

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])
  const { auth } = useAuth()
  const [shoppingListAmount, setShoppingListAmount] = useState(JSON.parse(localStorage.getItem(`shoppinglist_${auth.user.userId}`))?.length || 0)

  return (
    <section className='flex justify-center xs:py-4 lg:mx-8'>
      <div className='max-w-8xl w-full flex flex-col rounded space-y-2 bg-container px-4 lg:px-8 py-4 min-h-[90vh]'>
        <div className='flex flex-col sm:flex-row gap-2 py-2 w-full'>
          <h1 className='text-3xl lg:text-4xl font-semibold text-gray-500 '>Plan your daily meals</h1>
          <div className='flex-1 flex justify-end'>
            <Link to='/shoppinglist' >
              <div className='button-contained-square flex justify-center items-center space-x-2 sm:w-48 h-12 relative'>
                <h1 className='lg:text-xl font-semibold'>Shopping list</h1>
                <ShoppingIcon style='w-8 h-8 fill-green-accent fill-green-600' />
                {shoppingListAmount > 0 &&
                <div className='rounded-full w-5 h-5 opacity-100 bg-green-variant dark:bg-green-dark absolute flex text-sm text-center items-center justify-center text-white font-bold bottom-1 right-2 outline cursor-pointer pointer-events-none'>
                  {shoppingListAmount}
                </div>}
              </div>
            </Link>
          </div>
        </div>
        <div className='w-full'>
          <Calendar chosenDate={chosenDate} setChosenDate={setChosenDate} newPlannedRecipe={newPlannedRecipe} setNewPlannedRecipe={setNewPlannedRecipe} removedPlannedRecipe={removedPlannedRecipe} />
        </div>
        <div className='pt-4'>
          <PlannedMeals chosenDate={chosenDate} newPlannedRecipe={newPlannedRecipe} setRemovedPlannedRecipe={setRemovedPlannedRecipe} setShoppingListAmount={setShoppingListAmount}/>
        </div>
      </div>
    </section>
  )
}

export default MealPlanner