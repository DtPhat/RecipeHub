import React from 'react'
import Calendar from './Calendar'
import ShoppingIcon from '../../assets/ShoppingIcon'
import PlannedMeals from './PlannedMeals'
import { useState } from 'react'
import { Table } from 'flowbite-react'
const MealPlanner = () => {
  const today = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate())
  const [chosenDate, setChosenDate] = useState(today)
  return (
    <section className='flex justify-center py-4 mx-8'>
      <div className='max-w-8xl w-full flex flex-col rounded space-y-2 bg-gray-50 px-8 py-4'>
        <div className='flex justify-between py-2'>
          <h1 className='text-4xl font-semibold text-gray-600'>Plan your meals</h1>
          <div className=''>
            <button className='button-contained-square flex justify-center items-center space-x-2 w-48 h-12 '>
              <h1 className='text-xl font-semibold'>Shopping list</h1>
              <ShoppingIcon style='w-8 h-8 fill-green-accent fill-green-600' />
            </button>
          </div>
        </div>
        <div className='w-full'>
          <Calendar chosenDate={chosenDate} setChosenDate={setChosenDate} />
        </div>
        <div className='pt-4'>
          <PlannedMeals chosenDate={chosenDate} />
        </div>
      </div>
    </section>
  )
}

export default MealPlanner