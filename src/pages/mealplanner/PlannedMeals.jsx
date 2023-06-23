import React from 'react'
import dummyRecipes from '../../dummyRecipes'
import msConverter from '../../utils/msConverter'
const PlannedMeals = ({ chosenDate }) => {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const date = DAYS[chosenDate.getDay()] + ' ' + chosenDate.getDate() + ' ' + MONTHS[chosenDate.getMonth()] + ' ' + chosenDate.getFullYear()
  const recipesElement = dummyRecipes.map(item => {
    const { imgUrl, title, tags, rating, prepTime, cookTime, recipeYield, ingredients, isFavourite } = item
    return (
      <div className='flex border-2 border-green-variant p-2 rounded bg-gray-100 relative'>
        <img src={imgUrl} alt="" className='w-32 h-32 object-fit rounded' />
        <div className='flex flex-col ml-4 overflow-hidden w-96'>
          <h1 className='text-lg font-bold text-green-variant'>Breakfast</h1>
          <h1 className='text-xl font-bold text-green-accent truncate'>{title}</h1>
          <div className='flex flex-col font-medium'>
            <div className='flex items-center space-x-2'><span className='text-gray-600'>Cook time:</span><span>{cookTime}</span></div>
            <div className='flex items-center space-x-2'><span className='text-gray-600'>Prep time:</span><span>{prepTime}</span></div>
            <div className='flex items-center space-x-2'><span className='text-gray-600'>Yield:</span><span>{recipeYield}</span></div>
          </div>
        </div>
      </div>)
  })
  return (
    <div className='border-t-2 border-gray-400 min-h-[16rem] px-2 space-y-4 py-4 '>
      <h1 className='font-bold text-xl'>{date}</h1>
      <div className='grid grid-cols-2 gap-4'>
        {recipesElement}
      </div>
    </div>
  )
}

export default PlannedMeals