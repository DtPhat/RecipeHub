import React from 'react'
import { useState } from 'react'
import ClockIcon from '../../assets/ClockIcon'
import HeartIcon from '../../assets/HeartIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import LeafIcon from '../../assets/LeafIcon'
import StarIcon from '../../assets/StarIcon'
import useOuterClick from '../../hooks/useOuterClick'
import GlobalRecip from '../../components/GlobalRecipe'
import { msToTime } from '../../utils/TimeUtil'
import RecipeDetails from '../../components/RecipeDetails'

const PlannerView = ({ recipeData, chosenRecipe, setChosenRecipe }) => {
  return (
    <section>
      <div className='space-y-4 py-2'>
        {recipeData.map((recipe, i) => {
          const { recipe_id, images, title, tags, rating, prep_time, cook_time, recipe_yield, ingredients, is_favourite, unit } = recipe
          const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
          const stars = []
          for (let i = 0; i < 5; i++) {
            stars.push(i < rating ? true : false)
          }
          return (
            <div key={recipe_id} className={`${chosenRecipe?.recipe_id == recipe_id ? 'outline outline-green-accent' : 'hover:border-accent'} flex items-center border-2 border-gray-300 rounded m-1 p-1 bg-item  cursor-pointer relative`}
              onClick={() => { setChosenRecipe(recipe) }}>
              <div className='w-32 h-32'>
                <img src={recipeImage} alt="" className='w-full h-full rounded' />
              </div>
              <div className='flex flex-col ml-4 space-y-2  overflow-hidden flex-1'>
                <h1 className='text-xl font-bold text-accent truncate'>{title}</h1>
                <div className='space-x-2'>
                  <div className='flex space-x-1'>
                    {stars.map((star, i) => {
                      return <StarIcon key={i} style={`w-4 h-4 stroke-transparent ${star ? 'fill-orange-accent' : 'fill-gray-300 outline-none'}`} />
                    })}
                  </div>
                </div>
                <div className='flex items-center space-x-4 font-medium'>
                  <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span className='hidden sm:block'>{msToTime(cook_time)}</span></div>
                  <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span className='hidden sm:block'>{ingredients.length} Ingredient{ingredients.length > 1 ? 's' : ''}</span></div>
                  <div className='flex items-center space-x-1'><KnifeForkIcon style='w-5 h-5' /><span className='hidden sm:block'>{recipe_yield} {unit}{recipe_yield > 1 ? 's' : ''}</span></div>
                </div>
                <div className='gap-2 flex flex-wrap max-h-[2rem] overflow-auto'>
                  {tags.map((tag) => {
                    return (
                      <span key={tag.tagId} className='border rounded-full py-0.5 px-3 border-green-variant text-accent font-semibold'>
                        {tag.tagName}
                      </span>)
                  })}
                </div>
              </div>
              {is_favourite && <HeartIcon style='w-6 h-6 absolute fill-red-500 stroke-red-100 left-3 top-3' />}
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default PlannerView