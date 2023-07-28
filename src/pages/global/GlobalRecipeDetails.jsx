import { Carousel, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { msToTime } from '../../utils/TimeUtil'
import { adjustQuantity } from '../../utils/StringUtils'
import { useNavigate } from 'react-router-dom'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import ClockIcon from '../../assets/ClockIcon'
import LeafIcon from '../../assets/LeafIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import MinusCircleIcon from '../../assets/MinusCircleIcon'
import PlusCircleIcon from '../../assets/PlusCircleIcon'
import Toast from '../../components/Toast'
import CopyingIcon from '../../assets/CopyingIcon'
import BeakerIcon from '../../assets/BeakerIcon'
import { useParams } from 'react-router-dom'
import Skeleton from '../../components/Skeleton'
import useAuth from '../../hooks/useAuth'
const GlobalRecipeDetails = () => {
  const privateAxios = usePrivateAxios()
  const { recipeId } = useParams()
  const [chosenRecipe, setChosenRecipe] = useState({})
  const { recipe_id, images, title, tags, rating, pre_time, cook_time, recipe_yield, ingredients, is_favourite, unit, description, steps, nutrition, privacyStatus } = chosenRecipe
  const [customeYield, setCustomYield] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  console.log(chosenRecipe);
  useEffect(() => {
    recipeId && privateAxios.get(`/api/v1/global/recipe/${recipeId}`).then(response => {setChosenRecipe(response.data); setCustomYield(response.data.recipe_yield)})
      .catch(error => { console.log(error) && navigate('/global') })
      .finally(() => setLoading(false))
    !recipeId && navigate('/global')
  }, []);

  const style = {
    heading: 'text-2xl font-bold underline underline-offset-4 pb-4'
  }
  const { auth } = useAuth()
  const copyRecipe = () => {
    setSubmitting(true)
    setShowingToast(true)
    privateAxios.post(`/api/v1/user/copy-recipe/${recipe_id}`)
      .then((responseId) => navigate(`/recipe/edit?recipe_id=${responseId.data}`))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))
  }
  return (
    <main className='flex justify-center min-h-[95vh]'>
      {loading ?
        <Skeleton />
        : <section className='w-full max-w-7xl h-[85vh] p-4 my-4 bg-container rounded'>
          <div className='text-lg flex space-x-6 justify-end'>
            <div className='flex space-x-2'>
              <button className='button-outlined-square py-0.5 w-auto' disabled={submitting || !auth?.user}
                onClick={copyRecipe}>
                <CopyingIcon style='w-6 h-6' />
                {
                  submitting ?
                    <Spinner color='success' />
                    : <span>Copy</span>
                }
              </button>
            </div>
            <button className='button-outlined-square w-10 py-0 color-secondary opacity-50 hover:opacity-100'
              onClick={(e) => { e.stopPropagation(); navigate('/global') }}>X</button>
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
                <h1 className='text-3xl font-bold text-accent break-words pt-2'>{title}</h1>
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
                  <button className='rounded-full text-accent hover:bg-green-100 dark:hover:bg-green-900'
                    onClick={() => setCustomYield(preYield => preYield > 1 ? preYield - 1 : preYield)}><MinusCircleIcon style='w-8 h-8' />
                  </button>
                  <div className='flex gap-2'>
                    <span>Yield:</span>
                    <h2 className='font-bold text-accent'>{customeYield}</h2>
                  </div>
                  <button className='rounded-full text-accent hover:bg-green-100 dark:hover:bg-green-900'
                    onClick={() => setCustomYield(preYield => preYield + 1)}><PlusCircleIcon style='w-8 w-8' />
                  </button>
                </div>
                <div className='text-lg'>
                  {ingredients.map((ingredient, i) => {
                    const quantity = Number(ingredient.amount.split(' ')[0])
                    const metric = ingredient.amount.replace(quantity, '').trim()
                    const originalYield = recipe_yield
                    return (
                      <li key={ingredient.ingredientId} className={`font-semibold px-2 break-words py-1 cursor-pointer ${i % 2 === 0 ? 'bg-gray' : ''}`}>
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
                ${i % 2 === 0 ? 'bg-gray-' : ''}
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
          </div >
        </section>
      }</main>

  )
}

export default GlobalRecipeDetails