import { Carousel } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BeakerIcon from '../assets/BeakerIcon'
import ClockIcon from '../assets/ClockIcon'
import EditingIcon from '../assets/EditingIcon'
import EyeIcon from '../assets/EyeIcon'
import HeartIcon from '../assets/HeartIcon'
import KnifeForkIcon from '../assets/KnifeForkIcon'
import LeafIcon from '../assets/LeafIcon'
import MinusCircleIcon from '../assets/MinusCircleIcon'
import PlanningIcon from '../assets/PlanningIcon'
import PlusCircleIcon from '../assets/PlusCircleIcon'
import SharingIcon from '../assets/SharingIcon'
import StarIcon from '../assets/StarIcon'
import TrashIcon from '../assets/TrashIcon'
import usePrivateAxios from '../hooks/usePrivateAxios'
import { adjustQuantity } from '../utils/StringUtils'
import { msToTime } from '../utils/TimeUtil'
import ConfirmBox from './ConfirmBox'
import RecipePlanner from './RecipePlanner'
import SharingBox from './SharingBox'
const RecipeDetails = ({ chosenRecipe, setChosenRecipe, setRecipes }) => {
  const { recipe_id, images, title, tags, rating, pre_time, cook_time, recipe_yield, ingredients, is_favourite, unit, description, steps, nutrition, privacyStatus } = chosenRecipe
  const [customeYield, setCustomYield] = useState(recipe_yield)
  const [completedSteps, setCompletedSteps] = useState([])
  const [openSharingBox, setOpenSharingBox] = useState(false)
  const [openRecipePlanner, setOpenRecipePlanner] = useState(false)
  const navigate = useNavigate()
  const privateAxios = usePrivateAxios()
  const [confirmDeletion, setConfirmDeletion] = useState(false)
  const style = {
    heading: 'text-2xl font-bold underline underline-offset-4 pb-4'
  }
  const deleteRecipe = (id) => {
    setRecipes(recipes => recipes.filter(recipe => recipe.recipe_id != id))
    setChosenRecipe(undefined)
    privateAxios.delete(`/api/v1/user/recipe/${id}`)
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }
  return (
    <section className='min-h-[85vh]'>
      <div className='text-lg flex space-x-1 xs:space-x-6 justify-end'>
        {setRecipes !== undefined &&
          <button className='button-outlined-square py-0.5 w-12 color-danger opacity-70 hover:opacity-100'
            onClick={(e) => {
              e.stopPropagation();
              // window.confirm('Are you sure to delete this recipe?') && (deleteRecipe(recipe_id) && setChosenRecipe(undefined))
              setConfirmDeletion(true)
            }}>
            <TrashIcon style='w-6 h-6' />
          </button>}
        <div className='flex space-x-1 xs:space-x-2'>
          <button className='button-outlined-square py-0.5 w-12 sm:w-24'
            onClick={() => setOpenRecipePlanner(true)}>
            <PlanningIcon style='w-6 h-6' />
            <span className='hidden sm:block'>Plan</span>
          </button>
          <button className='button-outlined-square py-0.5 w-12 sm:w-24'
            onClick={() => setOpenSharingBox(true)}>
            <SharingIcon style='w-6 h-6' />
            <span className='hidden sm:block'>Share</span>
          </button>
          <button className='button-outlined-square py-0.5 w-12 sm:w-24' onClick={() => navigate(`/recipe/edit?recipe_id=${recipe_id}`)}>
            <EditingIcon style='w-6 h-6' />
            <span className='hidden sm:block'>Edit</span>
          </button>
        </div>
        <button className='button-outlined-square w-10 py-0 color-secondary opacity-50 hover:opacity-100'
          onClick={(e) => { e.stopPropagation(); setChosenRecipe(undefined) }}>X
        </button>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
          <div className=' w-64 h-64 xs:w-96 xs:h-96 border rounded-xl mt-2 md:mt-1'>
            <Carousel>
              {images.map((image) => (
                <div key={image.imageId} className='relative rounded-r-xl w-64 h-64 xs:w-96 xs:h-96'>
                  <img src={image.imageUrl} className='w-full h-full' />
                </div>))}
            </Carousel>
          </div>
          <div className='space-y-6 flex-1 pt-2'>
            <h1 className='text-3xl font-bold text-green-accent break-words pt-2'>{title}</h1>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <p className='flex gap-1'>
                {Array.apply(null, Array(5)).map((star, i) => <StarIcon key={i} style={`w-6 h-6 stroke-transparent ${i < rating ? 'fill-orange-accent' : 'fill-gray-300 outline-none'}`} />)}
              </p>
              <div className='flex items-center space-x-2'>
                <EyeIcon isOn={privacyStatus === 'PUBLIC'} style='w-6 h-6' />
                <span className='text-lg font-semibold'>{privacyStatus}</span>
              </div>
              {is_favourite ? <div className='flex items-center space-x-2'>
                <HeartIcon style='w-6 h-6 fill-red-500' />
                <span className='text-lg font-semibold'>FAVOURITE</span>
              </div> : <div></div>}
            </div>
            <div className='flex flex-wrap justify-between text-lg font-semibold gap-4'>
              <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span>Cook time: {msToTime(cook_time)}</span></div>
              <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span>{ingredients.length} Ingredient{ingredients.length > 1 ? 's' : ''}</span></div>
              <div className='flex items-center space-x-1'><BeakerIcon style='w-6 h-6' /><span>Prep time: {msToTime(pre_time)}</span></div>
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
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-96'>
            <h1 className={`${style.heading} text-center`}>Ingredients</h1>
            <div className='flex justify-center gap-8 py-1 text-lg '>
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
                const metric = ingredient.amount.replace(quantity, '').trim()
                const originalYield = recipe_yield
                return (
                  <li key={ingredient.ingredientId} className={`font-semibold px-2 break-words py-1 cursor-pointer ${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
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
        <ConfirmBox open={confirmDeletion} setOpen={setConfirmDeletion} callback={() => deleteRecipe(recipe_id)} message='Are you sure you want to delete this recipe' />
        <SharingBox open={openSharingBox} setOpen={setOpenSharingBox} id={recipe_id} />
        <RecipePlanner open={openRecipePlanner} setOpen={setOpenRecipePlanner} id={recipe_id} />
      </div >
    </section>

  )
}

export default RecipeDetails