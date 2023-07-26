import React, { useEffect, useRef, useState } from 'react'
import PlusCircleIcon from '../../assets/PlusCircleIcon'
import StarIcon from '../../assets/StarIcon'
import TrashIcon from '../../assets/TrashIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import { useNavigate } from 'react-router-dom'
import EyeIcon from '../../assets/EyeIcon'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { timeToMs } from '../../utils/TimeUtil'
import { Spinner, Tooltip } from 'flowbite-react';
import { defaultTagList } from '../recipe'
import useAuth from '../../hooks/useAuth'

const AddRecipe = () => {
  const { auth: { user: { userId } } } = useAuth()
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    tags: [],
    yield: 1,
    unit: '',
    photos: [],
    nutritions: '',
    prepTimeHour: '',
    prepTimeMinute: '',
    prepTimeSecond: '',
    cookTimeHour: '',
    cookTimeMinute: '',
    cookTimeSecond: '',
    isFavourite: false,
    rating: 0,
    ingredientName: '',
    ingredientQuantity: '',
    ingredientMetric: '',
    ingredients: [],
    steps: '',
    isPrivate: true,
  })
  const [tagList, setTagList] = useState(defaultTagList)
  const [showingError, setShowingError] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const imgInput = useRef()
  const navigate = useNavigate()
  const privateAxios = usePrivateAxios()
  const tagListElement = tagList.map(tag => (
    <div key={tag} className='relative group'>
      <button className={`${recipeData.tags.includes(tag) ? 'button-contained-square' : 'button-outlined-square'} w-auto py-1`}
        onClick={() => setRecipeData(prevData => {
          const tagList = [...prevData.tags]
          tagList.includes(tag) ? tagList.splice(tagList.indexOf(tag), 1) : tagList.push(tag)
          return { ...prevData, tags: tagList }
        })}>
        {tag}
      </button>
      {!defaultTagList.includes(tag) && <button className='absolute top-[-12px] right-[-15px] hidden group-hover:block'
        onClick={(e) => {
          e.stopPropagation()
          setTagList(list => list.filter(prevTag => prevTag !== tag))
          setRecipeData(prevData => ({ ...prevData, tags: prevData.tags.filter(prevTag => prevTag !== tag) }))
        }}>
        <XCircleIcon style='w-8 h-8 fill-green-100 text-accent opacity-50 hover:opacity-100' />
      </button>}
    </div>
  ))
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    privateAxios.get(`/api/v1/global/tags/${userId}`).then(response => setTagList(prevList => [...prevList, ...response.data.map(tag => tag.tagName)]))
  }, []);

  const photosElement = recipeData.photos.map((photo, i) =>
    <div key={i} className='relative group cursor-pointer'>
      <img src={`${URL.createObjectURL(photo)}`} className='w-40 h-40 border-4 border-gray-300 rounded-xl' />
      <button className='absolute p-2 bottom-2 right-2 hidden group-hover:block rounded-lg bg-gray-100 opacity-50'
        onClick={() => {
          setRecipeData(prevData => {
            const photoList = [...prevData.photos]
            photoList.splice(photoList.indexOf(photo), 1)
            return { ...prevData, photos: photoList }
          })
        }}>
        <TrashIcon style='w-6 h-6' />
      </button>
    </div>)

  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= recipeData.rating) stars.push(true)
    else stars.push(false)
  }
  const starsElement = stars.map((star, i) =>
    <button key={i} className='p-1'
      onClick={() => { setRecipeData(prevData => { return { ...prevData, rating: (prevData.rating !== i + 1) ? i + 1 : 0 } }) }}>
      <StarIcon style={`w-7 h-7 stroke-transparent ${star ? 'fill-yellow-600' : 'fill-gray-300'}`} />
    </button>
  )
  const ingredientsElement = recipeData.ingredients.map((ingredient, i) =>
    <li key={i} className='cursor-pointer font-semibold ml-8 hover:line-through'
      onClick={() => {
        const ingredientList = [...recipeData.ingredients]
        ingredientList.splice(ingredientList.indexOf(ingredient), 1)
        setRecipeData(prevData => { return { ...prevData, ingredients: ingredientList } })
      }}>
      <span>
        {ingredient.amount} {ingredient.name}
      </span>
    </li>)

  const addIngredient = () => {
    const { ingredientName, ingredientQuantity, ingredientMetric } = recipeData

    if (!ingredientName || !ingredientQuantity) return
    const newIngredient = {
      name: ingredientName,
      amount: ingredientQuantity ?
        ingredientQuantity + ' ' + ingredientMetric
        : ''
    }
    const ingredientList = recipeData.ingredients
    ingredientList.push(newIngredient)
    setRecipeData(prevData => { return { ...prevData, ingredientName: '', ingredientQuantity: '', ingredientMetric: '', ingredients: ingredientList } })
  }

  const addTag = () => {
    tagInput && !tagList.includes(tagInput.trim()) && setTagList(prevTagList => [...prevTagList, tagInput])
    setRecipeData(prevData => { return { ...prevData, tags: [...prevData.tags, tagInput] } })
    setTagInput('')
  }

  const handleChange = (e) => {
    let { name, value, type } = e.target
    if (type === 'number') {
      if (name.includes('Time')) {
        if (name.includes('Hour')) value = value < 0 ? 0 : value > 24 ? 24 : value
        else value = value < 0 ? 0 : value > 60 ? 60 : value
      } else if (name === 'yield') {
        value = value < 1 ? '' : value > 100 ? 100 : value
      } else {
        value = value < 0 ? '' : value > 99999 ? 99999 : value
      }
    }
    if (type === 'text') {
      value = name === 'title' && value.length > 100 ? value.substring(0, 100)
        : name === 'description' && value.length > 200 ? value.substring(0, 200)
          : name === 'unit' && value.length > 50 ? value.substring(0, 50)
            : name === 'nutritions' && value.length > 300 ? value.substring(0, 300)
              : name === 'ingredientName' && value.length > 50 ? value.substring(0, 50)
                : name === 'ingredientMetric' && value.length > 30 ? value.substring(0, 30)
                  : name === 'steps' && value.length > 800 ? value.substring(0, 800) : value
    }
    setRecipeData(prevData => { return { ...prevData, [name]: value } })
  }

  const uploadRecipe = () => {
    for (let key in errorMessages) {
      if (errorMessages.hasOwnProperty(key) && errorMessages[key]) {
        setShowingError(true)
        return
      }
    }
    setSubmitting(true)
    const formData = new FormData()
    const data = {
      ingredients: recipeData.ingredients.map(ingredient => {
        return {
          ingredientName: ingredient.name,
          amount: ingredient.amount
        }
      }),
      tags: recipeData.tags.map(tag => {
        return {
          tagName: tag
        }
      }),
      title: recipeData.title,
      pre_time: timeToMs(recipeData.prepTimeHour, recipeData.prepTimeMinute, recipeData.prepTimeSecond),
      cook_time: timeToMs(recipeData.cookTimeHour, recipeData.cookTimeMinute, recipeData.cookTimeSecond),
      recipe_yield: recipeData.yield || 1,
      rating: recipeData.rating,
      is_favourite: recipeData.isFavourite,
      description: recipeData.description,
      unit: recipeData.unit || 'serve',
      steps: recipeData.steps,
      nutrition: recipeData.nutritions,
      privacyStatus: recipeData.isPrivate ? 'PRIVATE' : 'PUBLIC'
    }
    const blobData = new Blob([JSON.stringify(data)], { type: 'application/json' })
    recipeData.photos.forEach(photo => {
      const blobImage = new Blob([photo], { type: "image/jpeg" })
      formData.append('files', blobImage, '.jpg');
    });
    formData.append('data', blobData);

    privateAxios.post('/api/v1/user/recipe',
      formData)
      .then(response => {
        console.log(response)
        navigate('/recipe')
      })
      .catch(error => console(error))
      .finally(() => setSubmitting(false))

  }
  const errorMessages = {
    title: !recipeData.title ? 'Title should not be empty' : '',
    tags: !recipeData.tags.length ? 'Each recipe should have at least 1 tag' : '',
    cookTime: !Number(recipeData.cookTimeHour) && !Number(recipeData.cookTimeMinute) && !Number(recipeData.cookTimeSecond) ? 'Cook time should be estimated' : '',
    ingredients: !recipeData.ingredients.length ? 'Each recipe should have at least 1 ingredient' : '',
    instruction: !recipeData.steps ? 'Instruction should not be empty' : '',
  }
  const style = {
    heading: 'font-semibold text-accent text-xl pb-1',
    input: `bg-item rounded border border-gray-400 py-1 px-2 focus:outline-green-accent`,
    input2: `w-28 bg-container border-b-2 border-gray-400 py-1 focus:outline-none focus:border-accent`,
    error: `text-orange-accent text-md py-1`
  }
  console.log(recipeData);
  return (
    <section className='py-2 flex justify-center'>
      <div className='max-w-8xl w-full px-4 lg:px-8 pt-2 pb-8 rounded bg-container'>
        <div className=' pb-2 font-semibold mb-8 border-b-2 flex justify-between gap-2'>
          <h1 className='text-3xl text-gray-500'>Create new recipe</h1>
          <div className='my-auto'>
            <button className='button-outlined-square w-28 py-0.5 color-secondary opacity-50 hover:opacity-100'
              onClick={() => navigate(-1)}>
              <XCircleIcon style='w-6 h-6' />
              <span className=''>Cancel</span>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-lg'>
          <div className='space-y-6'>
            <div className='flex flex-col'>
              <label className={`${style.heading}`} htmlFor='title'>Title</label>
              <input type='text' id='title' className={`${style.input}`} placeholder='Recipe name' name='title' value={recipeData.title}
                onChange={handleChange} />
              <div className={style.error}>{showingError && errorMessages.title}</div>
            </div>
            <div className='flex flex-col'>
              <label className={`${style.heading}`} htmlFor='description'>Description <span className='font-normal'>(optional)</span></label>
              <input type='text' id='description' className={`pb-4 ${style.input}`} placeholder='Recipe description' name='description' value={recipeData.description}
                onChange={handleChange} />
            </div>
            <div className='flex flex-col space-y-2'>
              <h1 className={`${style.heading}`}>Tags ({recipeData.tags?.length}/12)</h1>
              <div className='flex flex-wrap gap-3'>
                {tagListElement}
                {recipeData.tags.length < 12 && <div className='flex space-x-1 border-gray'>
                  <input type='text' placeholder='Tag name' className={`${style.input2} text-center`} name='tag' id='tag'
                    onKeyDown={(e) => { e.key === 'Enter' && addTag() }}
                    onChange={(e) => setTagInput(e.target.value.substring(0, 20))} value={tagInput} />
                  <button className='flex items-center' onClick={addTag}><PlusCircleIcon style='w-10 h-10 text-gray-400 hover:text-accent' /></button>
                </div>}
              </div>
              <div className={style.error}>{showingError && errorMessages.tags}</div>
            </div>
            <div className='flex flex-col'>
              <h1 className={`${style.heading}`}>Yield</h1>
              <div className='flex gap-2'>
                <input type='number' className={`w-24 text-center ${style.input}`} placeholder={1} name='yield'
                  onChange={handleChange} value={recipeData.yield} />
                <input type='text' placeholder='serve' className={`w-32 text-center ${style.input}`} name='unit' value={recipeData.unit}
                  onChange={handleChange} />
              </div>
            </div>
            <div className='flex flex-col'>
              <h1 className={`${style.heading} pb-2`}>Photos ({recipeData.photos.length}/8)</h1>
              <div className='flex flex-wrap gap-2 max-w-2xl'>
                {photosElement}
                {(recipeData.photos.length < 8) &&
                  <div className='w-40 h-40 group border-4 bg-gray-100 dark:bg-gray-700 border-gray-300 border-dashed hover:border-solid rounded-xl flex items-center justify-center cursor-pointer '
                    onClick={() => imgInput.current.click()}>
                    <PlusCircleIcon style='w-24 h-24 text-gray-200 group-hover:text-gray-300 dark:group-hover:text-gray-500' />
                  </div>}
                <input type='file' className='hidden' accept="image/*" ref={imgInput} onChange={(e) => {
                  const image = e.target.files[0]
                  image && setRecipeData(prevData => {
                    const newPhotos = prevData.photos
                    newPhotos.push(image)
                    return { ...prevData, photos: newPhotos }
                  })
                }} />
              </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='nutritions' className={`${style.heading}`}>Nutrition <span className='font-normal'>(optional)</span></label>
              <textarea rows={5} className={`${style.input}`} placeholder='100 Calories' id='nutritions' name='nutritions' onChange={handleChange} value={recipeData.nutritions}></textarea>
            </div>
          </div>
          <div className='space-y-6'>
            <div className='flex gap-16 flex-wrap'>
              <div className='flex flex-col'>
                <h1 className={`${style.heading}`}>Preparation time</h1>
                <div className='flex gap-2'>
                  <input type='number' className={`w-14 text-center ${style.input}`} placeholder='00' name='prepTimeHour' value={recipeData.prepTimeHour}
                    onChange={handleChange} />
                  <span className={`text-2xl font-semibold`}>:</span>
                  <input type='number' className={`w-14 text-center ${style.input}`} placeholder='00' name='prepTimeMinute' value={recipeData.prepTimeMinute}
                    onChange={handleChange} />
                  <span className={`text-2xl font-semibold`}>:</span>
                  <input type='number' className={`w-14 text-center ${style.input}`} placeholder='00' name='prepTimeSecond' value={recipeData.prepTimeSecond}
                    onChange={handleChange} />
                </div>
              </div>
              <div className='flex flex-col'>
                <h1 className={`${style.heading}`}>Cook time</h1>
                <div className='flex gap-2'>
                  <input type='number' className={`w-14 text-center ${style.input}`} placeholder='00' name='cookTimeHour' value={recipeData.cookTimeHour}
                    onChange={handleChange} />
                  <span className={`text-2xl font-semibold`}>:</span>
                  <input type='number' className={`w-14 text-center ${style.input}`} placeholder='00' name='cookTimeMinute' value={recipeData.cookTimeMinute}
                    onChange={handleChange} />
                  <span className={`text-2xl font-semibold`}>:</span>
                  <input type='number' className={`w-14 text-center ${style.input}`} placeholder='00' name='cookTimeSecond' value={recipeData.cookTimeSecond}
                    onChange={handleChange} />
                </div>
                <div className={style.error}>{showingError && errorMessages.cookTime}</div>
              </div>
            </div>
            <div className='flex space-x-4 xs:space-x-28'>
              <div>
                <h1 className={`${style.heading}`}>Favourite</h1>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={recipeData.isFavourite}
                    onChange={() => { setRecipeData(prevData => { return { ...prevData, isFavourite: !prevData.isFavourite } }) }} />
                  <div className="w-11 h-6 bg-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-variant"></div>
                </label>
              </div>
              <div>
                <h1 className={`${style.heading}`}>Rating</h1>
                <div className='flex'>
                  {starsElement}
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className={`${style.heading}`}>Ingredients</h1>
              <ul className='py-1 list-disc'>
                {ingredientsElement}
              </ul>
              <div className='flex space-x-2 text-lg'>
                <div className='flex flex-col w-7/12'>
                  <label htmlFor='name' className='font-medium text-accent'>Name</label>
                  <input type='text' placeholder='Ingredient name' className={`w-full ${style.input2}`} name='ingredientName'
                    onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                    onChange={handleChange} value={recipeData.ingredientName} />
                </div>
                <div className='flex flex-col w-2/12'>
                  <label htmlFor='quantity' className='font-medium text-accent'>Quantity</label>
                  <input type='number' placeholder='1' className={` ${style.input2}`} name='ingredientQuantity'
                    onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                    onChange={handleChange} value={recipeData.ingredientQuantity} />
                </div>
                <div className='flex flex-col w-2/12'>
                  <label htmlFor='metric' className='font-medium text-accent '>Metric</label>
                  <input type='text' placeholder='(optional)' className={` ${style.input2}`} name='ingredientMetric'
                    onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                    onChange={handleChange} value={recipeData.ingredientMetric} />
                </div>
                <button className='flex items-center mt-6' onClick={addIngredient}><PlusCircleIcon style='w-10 h-10 text-gray-400 hover:text-accent' /></button>
              </div>
              <div className={style.error}>{showingError && errorMessages.ingredients}</div>
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className={`${style.heading}`}>Instructions</h1>
              <span className='text-base pb-1 italic'>* Each step is separated by new line</span>
              <textarea name="steps" rows='10' className={`w-full ${style.input}`}
                placeholder='Step-by-step instructions for this recipe'
                onChange={handleChange} value={recipeData.steps}></textarea>
              <div className={style.error}>{showingError && errorMessages.instruction}</div>
            </div>
            <div className='flex justify-between pr-4'>
              <div className='flex items-center gap-2'>
                <h1 className={`${style.heading}`}>Status:</h1>
                <Tooltip content='Public recipes can be seen by everyone in Cooking Network' style='auto' >
                  <button className='flex items-center gap-2 border border-green-variant text-accent px-1 rounded-md font-medium hover:bg-green-100 dark:hover:bg-green-900'
                    onClick={() => { setRecipeData(prevData => { return { ...prevData, isPrivate: !prevData.isPrivate } }) }}>
                    <EyeIcon style='w-6 h-6' isOn={!recipeData.isPrivate} />
                    <span className=''>{recipeData.isPrivate ? "Private" : "Public"}</span>
                  </button>
                </Tooltip>
              </div>
              <button className='button-contained w-48' disabled={submitting}
                onClick={uploadRecipe}>
                {
                  submitting ?
                    <Spinner color='success' />
                    : <span>Save</span>
                }

              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddRecipe