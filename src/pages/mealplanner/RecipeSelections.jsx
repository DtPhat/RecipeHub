import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListView from '../../components/view/ListView'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { initialFilter } from '../recipe'
import dummyRecipes from '../../dummyRecipes'
import { getDayMonthYear } from '../../utils/DateUtils'
import SearchBar from '../../components/SearchBar'
const RecipeSelections = ({ innerRef, chosenDate, setOpen }) => {
  // const { recipe_id, images, title, tags, rating, pre_time, cook_time, recipe_yield, ingredients, is_favourite, unit, description, steps, nutrition, privacyStatus } = recipe
  // const [customeYield, setCustomYield] = useState(recipe_yield)
  // const [completedSteps, setCompletedSteps] = useState([])
  const [recipes, setRecipes] = useState([])
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const privateAxios = usePrivateAxios()
  const today = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate())
  useEffect(() => {
    // privateAxios.post(`/api/v1/user/meal-planer`, {
    //   date: today.getTime(),
    //   recipeId: 104,
    //   mealType: "DINNER"
    // }).then(response => console.log(response))
    privateAxios.delete(`/api/v1/user/meal-planer/${54}`).then(response => console.log(response))
  }, []);
  useEffect(() => {
    privateAxios.post(`/api/v1/user/recipes/filter?page=${0}&size=${100}`, {
      tags: initialFilter.tags,
      ingredients: initialFilter.ingredients,
      favorite: initialFilter.isFavourite,
      sortBy: initialFilter.sortingBy,
      direction: initialFilter.isAscending ? 'asc' : 'desc',
      title: initialFilter.title,
      privacyStatus: null
    })
      .then((response) => { setRecipes(response.data) })
      .catch((error) => console.log(error))
  }, []);
  console.log(recipes);
  return (
    <section
      className='fixed top-0 mt-20 p-4 left-1/2 translate-x-[-50%] max-w-5xl w-full h-[52rem] z-30 border-2 border-gray-300 rounded bg-gray-50 flex flex-col space-y-4 transition ease-in-out overflow-auto'
      ref={innerRef}>
      <h1 className='text-3xl font-bold'>Plan meal for {getDayMonthYear(chosenDate)}</h1>
      <div className='space-y-2'>
        <h1 className='text-xl pl-1'>Choose meal type:</h1>
        <div className='flex justify-between gap-4'>
          <button className='button-outlined-square font-bold text-xl'>Breakfast</button>
          <button className='button-outlined-square font-bold text-xl'>Lunch</button>
          <button className='button-outlined-square font-bold text-xl'>Dinner</button>
        </div>
      </div>
      <div className='space-y-4'>
        <h1 className='text-xl pl-1'>Choose a recipe: </h1>
        <SearchBar keyword={keyword} setKeyword={setKeyword} handleEnter={() => { }} />
        <div className='h-[29rem] overflow-auto'>
          <ListView recipeData={dummyRecipes} />
        </div>
      </div>
      <div className='flex gap-4 justify-end pt-2 pr-4'>
        <button className='button-outlined color-secondary opacity-50 hover:opacity-100 w-32'>Cancel</button>
        <button className='button-contained w-32'>Plan</button>
      </div>
    </section >
  )
}

export default RecipeSelections