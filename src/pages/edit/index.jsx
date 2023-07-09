import { Spinner, Tooltip } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EyeIcon from '../../assets/EyeIcon'
import PlusCircleIcon from '../../assets/PlusCircleIcon'
import StarIcon from '../../assets/StarIcon'
import TrashIcon from '../../assets/TrashIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import Skeleton from '../../components/Skeleton'
import useAuth from '../../hooks/useAuth'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { msToTime, timeToMs } from '../../utils/TimeUtil'
import { defaultTagList } from '../recipe'
const EditRecipe = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { auth: { user: { userId } } } = useAuth()
  const recipeId = searchParams.get('recipe_id')
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    tags: [],
    yield: 1,
    unit: '',
    photos: [],
    nutrition: '',
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
  const privateAxios = usePrivateAxios()
  const [tagList, setTagList] = useState(defaultTagList)
  const [tagInput, setTagInput] = useState('')
  const imgInput = useRef()
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    recipeId && privateAxios.get(`/api/v1/user/recipe/${recipeId}`).then(response => setRecipeData((prevData) => {
      const editedRecipe = response.data
      console.log(editedRecipe);
      return {
        title: editedRecipe.title,
        description: editedRecipe.description,
        tags: editedRecipe.tags.map(tag => tag.tagName),
        yield: editedRecipe.recipe_yield,
        unit: editedRecipe.unit,
        photos: editedRecipe.images,
        nutrition: editedRecipe.nutrition,
        prepTimeHour: msToTime(editedRecipe.pre_time).split(':')[0],
        prepTimeMinute: msToTime(editedRecipe.pre_time).split(':')[1],
        prepTimeSecond: msToTime(editedRecipe.pre_time).split(':')[2],
        cookTimeHour: msToTime(editedRecipe.cook_time).split(':')[0],
        cookTimeMinute: msToTime(editedRecipe.cook_time).split(':')[0],
        cookTimeSecond: msToTime(editedRecipe.cook_time).split(':')[0],
        isFavourite: editedRecipe.is_favourite,
        rating: editedRecipe.rating,
        ingredientName: '',
        ingredientQuantity: '',
        ingredientMetric: '',
        ingredients: editedRecipe.ingredients.map(ingredient => {
          return {
            name: ingredient.ingredientName,
            amount: ingredient.amount
          }
        }),
        steps: editedRecipe.steps,
        isPrivate: editedRecipe.privacyStatus === 'PRIVATE',
      }
    }))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))

    !recipeId && navigate('/')
  }, []);

  useEffect(() => {
    privateAxios.get(`/api/v1/global/tags/${userId}`).then(response => setTagList(prevList => [...prevList, ...response.data.map(tag => tag.tagName)]))
  }, []);

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
        onClick={() => setTagList(list => list.filter(prevTag => prevTag !== tag))}>
        <XCircleIcon style='w-8 h-8 fill-green-100 text-green-accent opacity-50 hover:opacity-100' />
      </button>}
    </div>
  ))

  const photosElement = recipeData.photos.map((photo, i) => {
    const imageUrl = photo instanceof File ? URL.createObjectURL(photo) : photo.imageUrl
    return (
      <div key={i} className='relative group cursor-pointer'>
        <img src={imageUrl} className='w-40 h-40 border-4 border-gray-300 rounded-xl' />
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
      </div>
    )
  })

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

    if (!ingredientName) return
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
        if (name.includes('Hour')) value = value < 0 ? '' : value > 24 ? 24 : value
        else value = value < 0 ? '' : value > 60 ? 60 : value
      } else {
        value = value < 0 ? '' : value > 99999 ? 99999 : value
      }
    }
    if (type === 'text') {
      value = name === 'title' && value.length > 100 ? value.substring(0, 100)
        : name === 'description' && value.length > 200 ? value.substring(0, 200)
          : name === 'unit' && value.length > 50 ? value.substring(0, 50)
            : name === 'nutrition' && value.length > 300 ? value.substring(0, 300)
              : name === 'ingredientName' && value.length > 50 ? value.substring(0, 50)
                : name === 'ingredientMetric' && value.length > 30 ? value.substring(0, 30)
                  : name === 'steps' && value.length > 800 ? value.substring(0, 800) : value
    }
    setRecipeData(prevData => { return { ...prevData, [name]: value } })
  }


  const editRecipe = () => {
    setSubmitting(true)
    const formData = new FormData()
    const data = {
      recipe_id: recipeId,
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
      images: recipeData.photos.filter(currentPhoto => !(currentPhoto instanceof File)),
      title: recipeData.title,
      pre_time: timeToMs(recipeData.prepTimeHour, recipeData.prepTimeMinute, recipeData.prepTimeSecond),
      cook_time: timeToMs(recipeData.cookTimeHour, recipeData.cookTimeMinute, recipeData.cookTimeSecond),
      recipe_yield: recipeData.yield,
      rating: recipeData.rating,
      is_favourite: recipeData.isFavourite,
      description: recipeData.description,
      unit: recipeData.unit,
      steps: recipeData.steps,
      nutrition: recipeData.nutrition,
      privacyStatus: recipeData.isPrivate ? 'PRIVATE' : 'PUBLIC'
    }
    console.log(data);
    const blobData = new Blob([JSON.stringify(data)], { type: 'application/json' })
    recipeData.photos.forEach(photo => {
      if (photo instanceof File) {
        const blobImage = new Blob([photo], { type: "image/jpeg" })
        formData.append('files', blobImage, '.jpg');
      }
    });
    formData.append('data', blobData);
    privateAxios.put(`/api/v1/user/recipe/${recipeId}`,
      formData)
      .then(response => {
        console.log(response)
        navigate('/recipe')
      })
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))

  }

  const style = {
    input: 'bg-gray-100 rounded border border-gray-400 py-1 px-2 focus:outline-green-accent',
    heading: 'font-semibold text-green-accent text-xl pb-1',
    input2: `w-28 bg-gray-50 border-b-2 border-gray-400 py-1 focus:outline-none focus:border-green-accent`,
  }
  console.log(recipeData);

  return (
    <section className='py-2 flex justify-center'>
      {loading ?
        <Skeleton />
        : <div className='max-w-8xl px-4 lg:px-8 pt-2 pb-8 rounded bg-gray-50'>
          <div className=' pb-2 font-semibold mb-4 border-b-2 flex justify-between'>
            <h1 className='text-3xl text-gray-600'>Edit recipe at ID {recipeId}</h1>
            <button className='button-outlined-square w-28 py-0 color-secondary opacity-50 hover:opacity-100'
              onClick={() => navigate(-1)}>
              <XCircleIcon style='w-6 h-6' />
              <span className=''>Cancel</span>
            </button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-lg'>
            <div className='space-y-8'>
              <div className='flex flex-col'>
                <label className={`${style.heading}`} htmlFor='title'>Title</label>
                <input type='text' id='title' className={`${style.input}`} placeholder='Recipe name' name='title' value={recipeData.title}
                  onChange={handleChange} />
              </div>
              <div className='flex flex-col'>
                <label className={`${style.heading}`} htmlFor='description'>Description</label>
                <input type='text' id='description' className={`pb-4 ${style.input}`} placeholder='Recipe description' name='description' value={recipeData.description}
                  onChange={handleChange} />
              </div>
              <div className='flex flex-col space-y-2'>
                <h1 className={`${style.heading}`}>Tags</h1>
                <div className='flex flex-wrap gap-3'>
                  {tagListElement}
                  <div className='flex space-x-1 border-gray-200'>
                    <input type='text' placeholder='Tag name' className={`${style.input2} text-center `}
                      onKeyDown={(e) => { e.key === 'Enter' && addTag() }}
                      onChange={(e) => setTagInput(e.target.value)} value={tagInput} />
                    <button className='flex items-center' onClick={addTag}><PlusCircleIcon style='w-10 h-10 text-gray-400 hover:text-green-accent' /></button>
                  </div>
                </div>
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
                <h1 className={`${style.heading}`}>Photos</h1>
                <div className='flex flex-wrap gap-2 max-w-2xl'>
                  {photosElement}
                  {(recipeData.photos.length < 8) &&
                    <div className='w-40 h-40 border-4 bg-gray-100 border-gray-300 border-dashed rounded-xl flex items-center justify-center cursor-pointer'
                      onClick={() => imgInput.current.click()}>
                      <PlusCircleIcon style='w-24 h-24 text-gray-200' />
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
                <label htmlFor='nutrition' className={`${style.heading}`}>Nutrition</label>
                <textarea rows={5} className={`${style.input}`} placeholder='100 Calories' id='nutrition' name='nutrition' onChange={handleChange} value={recipeData.nutrition}></textarea>
              </div>
            </div>
            <div className='space-y-8'>
              <div className='flex gap-16'>
                <div className='flex flex-col'>
                  <h1 className={`${style.heading}`}>Preparation time</h1>
                  <div className='flex gap-2'>
                    <input type='number' className={`w-16 text-center ${style.input}`} placeholder='00' name='prepTimeHour' value={recipeData.prepTimeHour}
                      onChange={handleChange} />
                    <span className={`text-2xl font-semibold`}>:</span>
                    <input type='number' className={`w-16 text-center ${style.input}`} placeholder='00' name='prepTimeMinute' value={recipeData.prepTimeMinute}
                      onChange={handleChange} />
                    <span className={`text-2xl font-semibold`}>:</span>
                    <input type='number' className={`w-16 text-center ${style.input}`} placeholder='00' name='prepTimeSecond' value={recipeData.prepTimeSecond}
                      onChange={handleChange} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <h1 className={`${style.heading}`}>Cook time</h1>
                  <div className='flex gap-2'>
                    <input type='number' className={`w-16 text-center ${style.input}`} placeholder='00' name='cookTimeHour' value={recipeData.cookTimeHour}
                      onChange={handleChange} />
                    <span className={`text-2xl font-semibold`}>:</span>
                    <input type='number' className={`w-16 text-center ${style.input}`} placeholder='00' name='cookTimeMinute' value={recipeData.cookTimeMinute}
                      onChange={handleChange} />
                    <span className={`text-2xl font-semibold`}>:</span>
                    <input type='number' className={`w-16 text-center ${style.input}`} placeholder='00' name='cookTimeSecond' value={recipeData.cookTimeSecond}
                      onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className='flex space-x-32'>
                <div>
                  <h1 className={`${style.heading}`}>Favourite</h1>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={recipeData.isFavourite}
                      onChange={() => { setRecipeData(prevData => { return { ...prevData, isFavourite: !prevData.isFavourite } }) }} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-variant"></div>
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
                    <label htmlFor='name' className='font-medium text-green-accent'>Name</label>
                    <input type='text' placeholder='Ingredient name' className={`w-full ${style.input2}`} name='ingredientName'
                      onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                      onChange={handleChange} value={recipeData.ingredientName} />
                  </div>
                  <div className='flex flex-col w-2/12'>
                    <label htmlFor='quantity' className='font-medium text-green-accent'>Quantity</label>
                    <input type='number' placeholder='1' className={` ${style.input2}`} name='ingredientQuantity'
                      onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                      onChange={handleChange} value={recipeData.ingredientQuantity} />
                  </div>
                  <div className='flex flex-col w-2/12'>
                    <label htmlFor='metric' className='font-medium text-green-accent '>Metric</label>
                    <input type='text' placeholder='tsp' className={` ${style.input2}`} name='ingredientMetric'
                      onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                      onChange={handleChange} value={recipeData.ingredientMetric} />
                  </div>
                  <button className='flex items-center mt-6' onClick={addIngredient}><PlusCircleIcon style='w-10 h-10 text-gray-400 hover:text-green-accent' /></button>
                </div>
              </div>
              <div className='flex flex-col justify-center'>
                <h1 className={`${style.heading}`}>Instructions</h1>
                <span className='text-base pb-1 italic'>* Each step is separated by new line</span>
                <textarea name="steps" rows='10' className={`w-full ${style.input}`}
                  placeholder='Step-by-step instructions for this recipe'
                  onChange={handleChange} value={recipeData.steps}></textarea>
              </div>
              <div className='flex justify-between pr-4'>
                <Tooltip content='Public recipes can be seen by everyone in cooking network' style='auto' >
                  <div className='flex items-center gap-2'>
                    <h1 className={`${style.heading}`}>Status:</h1>
                    <button className='flex items-center gap-2 border border-green-variant text-green-accent px-1 rounded-md font-medium hover:bg-green-100'
                      onClick={() => { setRecipeData(prevData => { return { ...prevData, isPrivate: !prevData.isPrivate } }) }}>
                      <EyeIcon style='w-6 h-6' isOn={!recipeData.isPrivate} />
                      <span className=''>{recipeData.isPrivate ? "Private" : "Public"}</span>
                    </button>
                  </div>
                </Tooltip>
                <button className='button-contained w-48' disabled={submitting}
                  onClick={editRecipe}>
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
      }
    </section>
  )
}

export default EditRecipe