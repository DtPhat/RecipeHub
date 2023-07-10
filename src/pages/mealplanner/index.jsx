import React, { useEffect, useState } from 'react'
import ShoppingIcon from '../../assets/ShoppingIcon'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { getStartOfDate } from '../../utils/DateUtils'
import Calendar from './Calendar'
import PlannedMeals from './PlannedMeals'
import ReactGA from 'react-ga';

const MealPlanner = () => {
  const privateAxios = usePrivateAxios()
  const today = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate())

  const [chosenDate, setChosenDate] = useState(getStartOfDate(new Date()))
  const [newPlannedRecipe, setNewPlannedRecipe] = useState()

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])
  
  return (
    <section className='flex justify-center xs:py-4 lg:mx-8'>
      <div className='max-w-8xl w-full flex flex-col rounded space-y-2 bg-gray-50 px-4 lg:px-8 py-4'>
        <div className='flex flex-col sm:flex-row gap-2 py-2 w-full'>
          <h1 className='text-3xl lg:text-4xl font-semibold text-gray-600 '>Plan your daily meals</h1>
          <div className='flex-1 flex justify-end'>
            <button className='button-contained-square flex justify-center items-center space-x-2 sm:w-48 h-12'>
              <h1 className='lg:text-xl font-semibold'>Shopping list</h1>
              <ShoppingIcon style='w-8 h-8 fill-green-accent fill-green-600' />
            </button>
          </div>
        </div>
        <div className='w-full'>
          <Calendar chosenDate={chosenDate} setChosenDate={setChosenDate} newPlannedRecipe={newPlannedRecipe} setNewPlannedRecipe={setNewPlannedRecipe}/>
        </div>
        <div className='pt-4'>
          <PlannedMeals chosenDate={chosenDate} newPlannedRecipe={newPlannedRecipe}/>
        </div>
      </div>
    </section>
  )
}

export default MealPlanner