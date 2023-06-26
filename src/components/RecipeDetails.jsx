import { Carousel } from 'flowbite-react'
import React, { useState } from 'react'
import ClockIcon from '../assets/ClockIcon'
import KnifeForkIcon from '../assets/KnifeForkIcon'
import LeafIcon from '../assets/LeafIcon'
import MinusCircleIcon from '../assets/MinusCircleIcon'
import PlusCircleIcon from '../assets/PlusCircleIcon'
import StarIcon from '../assets/StarIcon'
import { msToTime } from '../utils/TimeUtil'
import { getFirstNumber, adjustQuantity } from '../utils/StringUtils'
import XCircleIcon from '../assets/XCircleIcon'
const RecipeDetails = ({ innerRef, recipe, setOpen }) => {
  const { recipe_id, images, title, tags, rating, pre_time, cook_time, recipe_yield, ingredients, is_favourite, unit, description, steps, nutrition } = recipe
  const [customeYield, setCustomYield] = useState(recipe_yield)
  const style = {
    heading: 'text-2xl font-bold underline underline-offset-4 pb-4'
  }
  const [completedSteps, setCompletedSteps] = useState([])
  console.log('hello');
  return (
    <section
      className='fixed top-0 mt-20 p-4 left-1/2 translate-x-[-50%] max-w-7xl w-full h-[52rem] z-30 outline outline-gray-300 rounded bg-gray-50 flex flex-col gap-8 overflow-scroll transition ease-in-out'
      ref={innerRef}>
      <div className='absolute right-6 text-lg flex space-x-2'>
        <button className='button-outlined-square py-0 w-16'>Plan</button>
        <button className='button-outlined-square py-0 w-16'>Share</button>
        <button className='button-outlined-square py-0 w-16'>Edit</button>
        <div className='pl-4'>
          <button className='button-outlined-square w-9 py-0 color-secondary opacity-50 hover:opacity-100'
            onClick={(e) => { e.stopPropagation(); setOpen(false) }}>X</button>
        </div>
      </div>
      <div className='flex space-x-8'>
        <div className='w-96'>
          <Carousel>
            {images.length ?
              images.map((image) => (
                <div key={image.imageId} className='relative rounded-r-xl h-96 w-96 '>
                  <img src={image.imageUrl} className='w-full h-full' />
                </div>))
              : <div className='relative rounded-r-xl h-96 w-96 '>
                <img src='/img/default-recipe.jpg' className='w-full h-full' />
              </div>}
          </Carousel>
        </div>
        <div className='space-y-6 flex-1 max-w-[52rem] pt-8'>
          <h1 className='text-3xl truncate font-bold text-green-accent break-words'>{title}</h1>
          <div className='flex gap-1'>
            {Array.apply(null, Array(5)).map((star, i) => <StarIcon key={i} style={`w-6 h-6 stroke-transparent ${i < rating ? 'fill-orange-accent' : 'fill-gray-300 outline-none'}`} />
            )}
          </div>
          <div className='flex justify-between text-lg pr-4 font-semibold'>
            <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span>Cook time: {msToTime(cook_time)}</span></div>
            <div className='flex items-center space-x-1'><span>Prep time: {msToTime(pre_time)}</span></div>
            <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span>{ingredients.length} Ingredient{ingredients.length > 1 ? 's' : ''}</span></div>
            <div className='flex items-center space-x-1'><KnifeForkIcon style='w-6 h-6' /><span>Yield: </span><span>{recipe_yield} {unit}{recipe_yield > 1 ? 's' : ''}</span></div>
          </div>
          <div className='flex flex-wrap gap-2'>
            {tags.map(tag => (
              <button key={tag.tagId} className={`button-contained-square w-auto py-1`} >
                {tag.tagName}
              </button>))}
          </div>
          <div>
            <h1 className={style.heading}>Description</h1>
            <p className='text-lg break-words'>{description}</p>
          </div>
        </div>
      </div>
      <div className='flex space-x-4'>
        <div className='w-96'>
          <h1 className={`${style.heading} text-center`}>Ingredients</h1>
          <div className='flex justify-around py-1 text-lg'>
            <button className='rounded-full text-green-accent hover:bg-green-100'
              onClick={() => setCustomYield(preYield => preYield > 1 ? preYield - 1 : preYield)}><MinusCircleIcon style='w-8 h-8' />
            </button>
            <div className='flex gap-2'>
              <span>Yield:</span>
              <h2 className='font-bold text-green-accent'>{customeYield}</h2>
            </div>
            <button className='rounded-full text-green-accent hover:bg-green-100'
              onClick={() => setCustomYield(preYield => preYield + 1)}><PlusCircleIcon style='w-8 w-8' />
            </button>
          </div>
          <div className='text-lg'>
            {ingredients.map((ingredient, i) => {
              const quantity = Number(ingredient.amount.split(' ')[0])
              const metric = ingredient.amount.replace(quantity, '')
              const originalYield = recipe_yield
              return (
                <li key={ingredient.ingredientId} className={`font-semibold px-2 break-words hover:line-through py-1 cursor-pointer ${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <span>{adjustQuantity(quantity, customeYield, originalYield)} {metric} {ingredient.ingredientName}</span>
                </li>)
            })
            }
          </div>
        </div>
        <div className='flex-1 max-w-[52rem]'>
          <h1 className={`${style.heading} text-center`}>Method</h1>
          <ol>
            {steps.split('\n').map((step, i) => step &&
              (<li key={i} onClick={() => setCompletedSteps(prevCompletedSteps =>
                prevCompletedSteps.includes(i) ? prevCompletedSteps.filter(stepIndex => stepIndex !== i) : [...prevCompletedSteps, i])}
                className={`list-decimal capitalize font-semibold ml-8 pl-4 text-lg break-words hover:line-through py-1 cursor-pointer 
                ${i % 2 === 0 ? 'bg-gray-100' : ''}
                ${completedSteps.includes(i) ? 'line-through' : 'hover:line-through'}`}>
                <span>{step}</span>
              </li>))}
          </ol>
        </div>
      </div>
      <div className=''>
        <h1 className='text-2xl font-bold underline underline-offset-2 pb-2'>Nutrition</h1>
        <div className='text-lg'>
          {nutrition}
        </div>
      </div>
    </section>
  )
}

export default RecipeDetails