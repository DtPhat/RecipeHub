import React from 'react'
import { useState } from 'react'
import ClockIcon from '../../assets/ClockIcon'
import HeartIcon from '../../assets/HeartIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import LeafIcon from '../../assets/LeafIcon'
import StarIcon from '../../assets/StarIcon'
import useOuterClick from '../../hooks/useOuterClick'
import { msToTime } from '../../utils/TimeUtil'
import RecipeDetails from '../RecipeDetails'

const ListView = ({ recipeData }) => {
  const { ref, open, setOpen } = useOuterClick(false)
  return (
    <div className='space-y-4'>
      {recipeData.map((recipe, i) => {
        const { recipe_id, images, title, tags, rating, prep_time, cook_time, recipe_yield, ingredients, is_favourite, unit } = recipe
        const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
        const stars = []
        for (let i = 0; i < 5; i++) {
          stars.push(i < rating ? true : false)
        }
        return (
          <div key={recipe_id} className='flex items-center border-2 border-gray-300 rounded p-1 bg-gray-100 hover:border-green-accent cursor-pointer relative'
            onClick={() => setOpen(true)}>
            <img src={recipeImage} alt="" className='w-32 h-32 rounded' />
            <div className='flex flex-col ml-4 space-y-2'>
              <h1 className='text-xl font-bold text-green-accent'>{title}</h1>
              <div className='space-x-2'>
                <div className='flex space-x-1'>
                  {stars.map((star, i) => {
                    return <StarIcon key={i} style={`w-4 h-4 stroke-transparent ${star ? 'fill-orange-accent' : 'fill-gray-300 outline-none'}`} />
                  })}
                </div>
              </div>
              <div className='flex items-center space-x-4 font-medium'>
                <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span>{msToTime(cook_time)}</span></div>
                <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span>{ingredients.length} Ingredient{ingredients.length > 1 ? 's' : ''}</span></div>
                <div className='flex items-center space-x-1'><KnifeForkIcon style='w-5 h-5' /><span>Yield: </span><span>{recipe_yield} {unit}{recipe_yield > 1 ? 's' : ''}</span></div>
              </div>
              <div className='gap-2 py-1 flex flex-wrap'>
                {tags.map((tag) => {
                  return (
                    <span key={tag.tagId} className='border rounded-full py-0.5 px-3 border-green-variant text-green-accent font-semibold'>
                      {tag.tagName}
                    </span>)
                })}
              </div>
            </div>
            {is_favourite && <HeartIcon style='w-6 h-6 absolute fill-red-500 stroke-red-100 left-3 top-3' />}
            {open && <RecipeDetails innerRef={ref} recipe={recipe} setOpen={setOpen}/>}
          </div>
        )
      })}
    </div>

  )
}
export default ListView