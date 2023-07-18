import { Avatar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClockIcon from '../../assets/ClockIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import LeafIcon from '../../assets/LeafIcon'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { msToTime } from '../../utils/TimeUtil'

const GlobalRecipeItem = ({ recipeItem, setChosenRecipe }) => {
  const { userId, recipe_id, images, title, tags, rating, prepTime, cook_time, recipe_yield, unit, ingredients, isFavourite, steps } = recipeItem
  const privateAxios = usePrivateAxios()
  const navigate = useNavigate()
  const [author, setAuthor] = useState({
    profileImage: '',
    fullName: 'Reicpe\'s Author',
  })
  useEffect(() => {
    privateAxios.get(`/api/v1/global/user/profile/${userId}`).then(response => setAuthor({
      profileImage: response.data.profileImage,
      fullName: response.data.fullName
    }))
  }, []);
  const method = steps.split('\n')
  const difficulty = method.length < 5 ? 'easy' : method.length < 10 ? 'medium' : method.length < 15 ? 'hard' : 'master'
  const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
  return (
    <div className='w-full h-[32rem] flex flex-col rounded-lg bg-item border border-gray hover:border-accent cursor-pointer relative shadow-md'
      onClick={() => setChosenRecipe(recipeItem)}>
      <img src={recipeImage} alt="" className='w-full h-60 object-cover rounded-t-lg' />
      <div className='bg-gray-200 dark:bg-gray-700 flex items-center justify-between px-4'>
        <div className='flex items-center space-x-4 py-2'>
          <Avatar img={author.profileImage} alt="" rounded />
          <span className={`text-xl font-medium truncate hover:underline underline-offset-2 flex-1`}
            onClick={(e) => { e.stopPropagation(); navigate(`/user/${userId}`) }}>
            {author.fullName}
          </span>
        </div>
      </div>
      <div className='mx-4 py-2 space-y-4 overflow-auto'>
        <h1 className='text-xl font-bold text-accent truncate'>{title}</h1>
        <div className='space-x-1 font-semibold'>
          <span className='text-gray-600'>Difficulty:</span><span className='capitalize'>{difficulty}</span>
        </div>
        <div className='flex flex-wrap gap-4 items-center font-medium'>
          <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span>{msToTime(cook_time)}</span></div>
          <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span>{ingredients.length}</span><span>Ingredients</span></div>
          <div className='flex items-center space-x-1'><KnifeForkIcon style='w-5 h-5' /><span>{recipe_yield} {unit}{recipe_yield > 1 ? 's' : ''}</span></div>
        </div>
        <div className='gap-2 flex flex-wrap max-h-[5rem] overflow-auto'>
          {tags.map((tag) => {
            return (
              <p key={tag.tagId} className='border rounded-full py-0.5 px-3 border-green-variant text-accent font-semibold'>
                {tag.tagName}
              </p>)
          })}
        </div>
      </div>
    </div>)
}

export default GlobalRecipeItem