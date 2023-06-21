import React, { useRef, useState } from 'react'
import PlusCircleIcon from '../../assets/PlusCircleIcon'
import StarIcon from '../../assets/StarIcon'
import TrashIcon from '../../assets/TrashIcon'
import XCircleIcon from '../../assets/XCircleIcon'
import { useNavigate } from 'react-router-dom'
import EyeIcon from '../../assets/EyeIcon'
import axios, { axiosPrivate } from '../../api/axios'
import useAuth from '../../hooks/useAuth'
const AddRecipe = () => {
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
    ingredientQuantity: undefined,
    ingredientMetric: '',
    ingredients: [],
    steps: '',
    isPrivate: true,
  })
  const { auth } = useAuth()
  const imgInput = useRef()
  const navigate = useNavigate()
  const tagList = ['breakfast', 'lunch', 'dinner', 'appetizer', 'dessert', 'drink', 'snack', 'vegetarian']
  const tagListElement = tagList.map(tag => (
    <button key={tag} className={`border-2 border-green-variant text-green-accent px-2 py-1 rounded-md font-medium
    ${recipeData.tags.includes(tag) ? 'text-whitegray bg-green-accent hover:opacity-90' : 'hover:bg-green-100'}`}
      onClick={() => setRecipeData(prevData => {
        const tagList = prevData.tags
        tagList.includes(tag) ? tagList.splice(tagList.indexOf(tag), 1) : tagList.push(tag)
        return { ...prevData, tags: tagList }
      })}>
      {tag}
    </button>))

  const photosElement = recipeData.photos.map((photo, i) =>
    <div key={i} className='relative group cursor-pointer'>
      <img src={`${URL.createObjectURL(photo)}`} className='w-40 h-40 border-4 border-gray-300 rounded-xl' />
      <button className='absolute p-2 bottom-2 right-2 hidden group-hover:block rounded-lg bg-gray-100 opacity-50'
        onClick={() => {
          setRecipeData(prevData => {
            const photoList = prevData.photos
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
        const ingredientList = recipeData.ingredients
        ingredientList.splice(ingredientList.indexOf(ingredient), 1)
        setRecipeData(prevData => { return { ...prevData, ingredients: ingredientList } })
      }}>
      <span className=' '>
        {ingredient.quantity} {ingredient.metric} {ingredient.name}
      </span>
    </li>)

  const addIngredient = () => {
    const { ingredientName, ingredientQuantity, ingredientMetric } = recipeData
    if (!ingredientName) return
    const newIngredient = {
      name: ingredientName,
      quantity: ingredientQuantity,
      metric: ingredientMetric
    }
    const ingredientList = recipeData.ingredients
    ingredientList.push(newIngredient)
    setRecipeData(prevData => { return { ...prevData, ingredientName: '', ingredientQuantity: '', ingredientMetric: '', ingredients: ingredientList } })
  }

  const handleChange = (e) => {
    let { name, value, type } = e.target
    if (type === 'number') {
      if ('prepTimeHour prepTimeMinute prepTimeSecond cookTimeHour cookTimeMinute cookTimeSecond'.includes(name)) {
        value = value < 0 ? 0 : value > 60 ? 60 : value
      } else {
        value = value < 1 ? 1 : value > 99999 ? 99999 : value
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
    const formData = new FormData()
    const data = {
      "recipe_id": null,
      "userId": 0,
      "ingredients": [
        {
          "ingredientId": 0,
          "ingredientName": "string",
          "amount": "string"
        }
      ],
      "images": [
        {
          "imageId": 0,
          "imageUrl": "string"
        }
      ],
      "tags": [
        {
          "tagId": 0,
          "tagName": "string"
        }
      ],
      "title": "string",
      "pre_time": 0,
      "cook_time": 0,
      "recipe_yield": 0,
      "rating": 0,
      "is_favourite": true,
      "description": "string",
      "unit": "string",
      "steps": "string",
      "nutrition": "string",
      "privacyStatus": "string"
    }
    const blobImage = new Blob(recipeData.photos, { type: "image/jpeg" })
    const blobData = new Blob([JSON.stringify(data)], { type: 'application/json' })
    formData.append('files', blobImage, 'marguerite-729510_1280.jpg');
    formData.append('data', blobData);

    axios.post('/api/v1/user/recipe',
      formData, {
      headers: {
        "JWT": auth.jwtToken,
      }
    }).then(response => console.log(response))
  }

  const style = {
    input: 'bg-gray-100 rounded border border-gray-400 py-1 px-2 focus:outline-green-accent',
    heading: 'font-semibold text-green-accent text-xl pb-1',
  }
  console.log(recipeData);
  return (
    <section className='py-2 flex justify-center'>
      <div className='max-w-8xl px-8 pt-2 pb-8 rounded bg-gray-50'>
        <div className=' pb-2 font-semibold mb-4 border-b-2 flex justify-between'>
          <h1 className='text-3xl text-gray-600'>Create new recipe</h1>
          <button className='flex items-center border-2 text-xl py-1 px-2 text-gray-500 hover:bg-red-200 hover:text-gray-800 hover:border-gray-800 space-x-1 rounded'
            onClick={() => navigate(-1)}>
            <XCircleIcon style='w-6 h-6' />
            <span className=''>Cancel</span>
          </button>
        </div>
        <div className='flex space-x-8 text-lg'>
          <div className='w-6/12 space-y-6  '>
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
              <div className='flex flex-wrap gap-2'>{tagListElement}</div>
            </div>
            <div className='flex flex-col'>
              <h1 className={`${style.heading}`}>Yield</h1>
              <div className='flex gap-2'>
                <input type='number' className={`w-24 text-center ${style.input}`} placeholder={1} name='yield'
                  onChange={handleChange} value={recipeData.yield} />
                <input type='text' placeholder='serves' className={`w-32 text-center ${style.input}`} name='unit' value={recipeData.unit}
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
              <label htmlFor='nutritions' className={`${style.heading}`}>Nutrition</label>
              <textarea rows={5} className={`${style.input}`} placeholder='100 Calories' id='nutritions' name='nutritions' onChange={handleChange} value={recipeData.nutritions}></textarea>
            </div>
          </div>
          <div className='w-6/12 space-y-8'>
            <div className='flex gap-16'>
              <div className='flex flex-col'>
                <h1 className={`${style.heading}`}>Preparation time</h1>
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
              <div className='flex flex-col'>
                <h1 className={`${style.heading}`}>Cook time</h1>
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
                  <label htmlFor='name' className='font-medium text-green-accent text-base'>Name</label>
                  <input type='text' placeholder='Ingredient' className={`w-full ${style.input}`} name='ingredientName'
                    onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                    onChange={handleChange} value={recipeData.ingredientName} />
                </div>
                <div className='flex flex-col w-2/12'>
                  <label htmlFor='quantity' className='font-medium text-green-accent text-base'>Quantity</label>
                  <input type='number' placeholder='1' className={`text-center ${style.input}`} name='ingredientQuantity'
                    onKeyDown={(e) => { e.key === 'Enter' && addIngredient() }}
                    onChange={handleChange} value={recipeData.ingredientQuantity} />
                </div>
                <div className='flex flex-col w-2/12'>
                  <label htmlFor='metric' className='font-medium text-green-accent text-base'>Metric</label>
                  <input type='text' placeholder='optional' className={`text-center ${style.input}`} name='ingredientMetric'
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
              <div className='flex items-center gap-2'>
                <h1 className={`${style.heading}`}>Status:</h1>
                <button className='flex items-center gap-2 border border-green-variant text-green-accent px-1 rounded-md font-medium hover:bg-green-100'
                  onClick={() => { setRecipeData(prevData => { return { ...prevData, isPrivate: !prevData.isPrivate } }) }}>
                  <EyeIcon style='w-6 h-6' isOn={!recipeData.isPrivate} />
                  <span className=''>{recipeData.isPrivate ? "Private" : "Public"}</span>
                </button>
              </div>
              <button className='button-contained w-48'
                onClick={uploadRecipe}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddRecipe