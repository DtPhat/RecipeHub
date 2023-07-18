import { Modal } from 'flowbite-react'
import React, { useState } from 'react'
import ClockIcon from '../../assets/ClockIcon'
import HeartIcon from '../../assets/HeartIcon'
import StarIcon from '../../assets/StarIcon'
import useOuterClick from '../../hooks/useOuterClick'
import RecipeModal from '../RecipeModal'
import { msToTime } from '../../utils/TimeUtil'
import RecipeDetails from '../RecipeDetails'

const GalleryView = ({ recipeData, setRecipeData }) => {
  const [chosenRecipe, setChosenRecipe] = useState()
  return (
    <section className='py-2 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
      {recipeData.map(recipe => {
        const { recipe_id, images, title, tags, rating, prep_time, cook_time, recipe_yield, ingredients, is_favourite, unit } = recipe
        const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
        const stars = []
        for (let i = 0; i < 5; i++) {
          stars.push(i < rating ? true : false)
        }
        return (
          <div key={recipe_id}
            className='w-full h-80 flex flex-col border shadow-md border-gray p-1 rounded bg-item hover:border-accent cursor-pointer relative'
            onClick={() => setChosenRecipe(recipe)}>
            <img src={recipeImage} alt="" className='w-full h-52 rounded-t' />
            <div className='p-2 space-y-1'>
              <h1 className='text-xl font-bold text-accent pt-1 truncate'>{title}</h1>
              <div className='flex font-medium space-x-1'><ClockIcon style='w-6 h-6' /><span>{msToTime(cook_time)}</span></div>
              <div className='flex space-x-1'>
                {stars.map((star, i) => {
                  return <StarIcon key={i} style={`w-4 h-4 stroke-transparent ${star ? 'fill-orange-accent' : 'fill-gray-300'}`} />
                })}
              </div>
            </div>
            {is_favourite && <HeartIcon style='w-8 h-8 absolute fill-red-600 stroke-red-200 right-4 top-40' />}
          </div>)
      })}
      <RecipeModal chosenRecipe={chosenRecipe} setChosenRecipe={setChosenRecipe} setRecipes={setRecipeData} />
    </section>
  )
}

export default GalleryView