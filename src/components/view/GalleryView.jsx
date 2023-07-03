import React, { useState } from 'react'
import ClockIcon from '../../assets/ClockIcon'
import HeartIcon from '../../assets/HeartIcon'
import StarIcon from '../../assets/StarIcon'
import useOuterClick from '../../hooks/useOuterClick'
import { msToTime } from '../../utils/TimeUtil'
import RecipeDetails from '../RecipeDetails'

const GalleryView = ({ recipeData }) => {
  const { ref, open, setOpen } = useOuterClick(false)
  const [chosenRecipe, setChosenRecipe] = useState()
  return (
    <section className='py-2 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {recipeData.map(recipe => {
        const { recipe_id, images, title, tags, rating, prep_time, cook_time, recipe_yield, ingredients, is_favourite, unit } = recipe
        const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
        const stars = []
        for (let i = 0; i < 5; i++) {
          stars.push(i < rating ? true : false)
        }
        return (
          <div key={recipe_id}
            className='w-full h-80 flex flex-col border-2 border-gray-200 rounded p-2 space-y-1 bg-gray-100 hover:border-green-accent cursor-pointer relative'
            onClick={() => { setChosenRecipe(recipe); setOpen(true) }}>
            <img src={recipeImage} alt="" className='w-full h-52 object-cover rounded' />
            <h1 className='text-xl font-bold text-green-accent pt-2 truncate'>{title}</h1>
            <div className='flex font-medium space-x-1'><ClockIcon style='w-6 h-6' /><span>{msToTime(cook_time)}</span></div>
            <div className='flex space-x-1'>
              {stars.map((star, i) => {
                return <StarIcon key={i} style={`w-4 h-4 stroke-transparent ${star ? 'fill-orange-accent' : 'fill-gray-300'}`} />
              })}
            </div>
            {is_favourite && <HeartIcon style='w-8 h-8 absolute fill-red-600 stroke-red-200 right-4 top-44' />}
          </div>)
      })}
      {open && <RecipeDetails innerRef={ref} recipe={chosenRecipe} setOpen={setOpen} />}
    </section>
  )
}

export default GalleryView